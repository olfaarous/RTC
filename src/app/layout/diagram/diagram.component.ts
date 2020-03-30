import { Component, OnInit ,Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import * as go from 'gojs';
import { ModelserviceService } from 'src/app/services/modelservice.service';
// import * as figure from '../../../assets/figure.js';

const $ = go.GraphObject.make; 



@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiagramComponent implements OnInit {
  
  public diagram: go.Diagram = null;
  public red = "orangered";  // 0 or false
  public green = "forestgreen";  // 1 or true  

  @Input()
  // public model: go.Model;

  @Output()
  public nodeClicked = new EventEmitter();

  constructor(public myservice : ModelserviceService) { }

  ngOnInit(): void {  
  }

  public ngAfterViewInit() {
    
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        grid: $(go.Panel, "Grid",
              $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
              $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
              $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
              $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
            ),
        "draggingTool.isGridSnapEnabled": true , // dragged nodes will snap to a grid of 10x10 cells
        "undoManager.isEnabled": true
      }
    );
    var palette = new go.Palette("palette");  // create a new Palette in the HTML DIV element "palette"

    //this.diagram.model = this.myservice.model;
    this.diagram.model = new go.GraphLinksModel(
      [
        {"category":"input", "key":"input1", "loc":"-150 -80" },
        {"category":"or", "key":"or1", "loc":"-70 0" },
        {"category":"not", "key":"not1", "loc":"10 0" },
        {"category":"xor", "key":"xor1", "loc":"100 0" },
        {"category":"or", "key":"or2", "loc":"200 0" },
        {"category":"output", "key":"output1", "loc":"200 -100" }
      ],
      [
        {"from":"input1", "fromPort":"out", "to":"or1", "toPort":"in1"},
        {"from":"or1", "fromPort":"out", "to":"not1", "toPort":"in"},
        {"from":"not1", "fromPort":"out", "to":"or1", "toPort":"in2"},
        {"from":"not1", "fromPort":"out", "to":"xor1", "toPort":"in1"},
        {"from":"xor1", "fromPort":"out", "to":"or2", "toPort":"in1"},
        {"from":"or2", "fromPort":"out", "to":"xor1", "toPort":"in2"},
        {"from":"xor1", "fromPort":"out", "to":"output1", "toPort":""}
      ]
    );

    
    // when the document is modified, add a "*" to the title and enable the "Save" button
    // this.diagram.addDiagramListener("Modified", function(e) {
    //   var button = <HTMLInputElement> document.getElementById("saveModel");
    //   if (button) button.disabled = !this.diagram.isModified;
    //   var idx = document.title.indexOf("*");
    //   if (this.diagram.isModified) {
    //     if (idx < 0) document.title += "*";
    //   } 
    //   else {
    //     if (idx >= 0) document.title = document.title.substr(0, idx);
    //   }
    // });

    // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths

    this.diagram.linkTemplate =
    $(go.Link,
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 3,
            relinkableFrom: true, relinkableTo: true,
            selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
            shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: "blue",
          },
          new go.Binding("isShadowed", "isSelected").ofObject(),
          $(go.Shape,
            { name: "SHAPE", strokeWidth: 2, stroke: this.red }));
      

    // node template helpers
      var sharedToolTip =
      $("ToolTip",
        { "Border.figure": "RoundedRectangle" },
        $(go.TextBlock, { margin: 2 },
          new go.Binding("text", "", function(d) { return d.category; })));

    // define some common property settings
    function nodeStyle() {
      return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      new go.Binding("isShadowed", "isSelected").ofObject(),
      {
        selectionAdorned: false,
        shadowOffset: new go.Point(0, 0),
        shadowBlur: 15,
        shadowColor: "blue",
        toolTip: sharedToolTip
      }];
    }

    function shapeStyle() {
      return {
        name: "NODESHAPE",
        fill: "lightgray",
        stroke: "darkslategray",
        desiredSize: new go.Size(40, 40),
        strokeWidth: 2
      };
    }

    function portStyle(input) {
      return {
        desiredSize: new go.Size(6, 6),
        fill: "black",
        fromSpot: go.Spot.Right,
        fromLinkable: !input,
        toSpot: go.Spot.Left,
        toLinkable: input,
        toMaxLinks: 1,
        cursor: "pointer"
      };
    }

    // define templates for each type of node
    var inputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Circle", shapeStyle(),
        { fill: this.red }),  // override the default fill (from shapeStyle()) to be red
      $(go.Shape, "Rectangle", portStyle(false),  // the only port
        { portId: "", alignment: new go.Spot(1, 0.5) }),
      { // if double-clicked, an input node will change its value, represented by the color.
        doubleClick: function(e, obj: go.GraphObject) {
          e.diagram.startTransaction("Toggle Input");
          var shp = (obj as go.Node).findObject("NODESHAPE");
          (shp as go.Shape).fill = ((shp as go.Shape).fill === this.green) ? this.red : this.green;
          updateStates();
          e.diagram.commitTransaction("Toggle Input");
        }
      }
    );

  var outputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", shapeStyle(),
        { fill: this.green }),  // override the default fill (from shapeStyle()) to be green
      $(go.Shape, "Rectangle", portStyle(true),  // the only port
        { portId: "", alignment: new go.Spot(0, 0.5) })
    );

  var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

  go.Shape.defineFigureGenerator("AndGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var cpOffset = KAPPA * .5;
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);
  
    // The gate body
    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .5 * h, (.5 + cpOffset) * w, 0,
      w, (.5 - cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, h, w, (.5 + cpOffset) * h,
      (.5 + cpOffset) * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    geo.spot1 = go.Spot.TopLeft;
    geo.spot2 = new go.Spot(.55, 1);
    return geo;
  });

  go.Shape.defineFigureGenerator("OrGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var radius = .5;
    var cpOffset = KAPPA * radius;
    var centerx = 0;
    var centery = .5;
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .5 * h, (centerx + cpOffset + cpOffset) * w, (centery - radius) * h,
      .8 * w, (centery - cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, h, .8 * w, (centery + cpOffset) * h,
      (centerx + cpOffset + cpOffset) * w, (centery + radius) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, 0, .25 * w, .75 * h, .25 * w, .25 * h).close());
    geo.spot1 = new go.Spot(.2, .25);
    geo.spot2 = new go.Spot(.75, .75);
    return geo;
  });

  go.Shape.defineFigureGenerator("NorGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var radius = .5;
    var cpOffset = KAPPA * radius;
    var centerx = 0;
    var centery = .5;
    var fig = new go.PathFigure(.8 * w, .5 * h, true);
    geo.add(fig);
  
    // Normal
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, h, .7 * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, 0, .25 * w, .75 * h,
      .25 * w, .25 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .8 * w, .5 * h, (centerx + cpOffset) * w, (centery - radius) * h,
      .7 * w, (centery - cpOffset) * h));
    radius = .1;
    cpOffset = KAPPA * .1;
    centerx = .9;
    centery = .5;
    var fig2 = new go.PathFigure((centerx - radius) * w, centery * h, true);
    geo.add(fig2);
    // Inversion
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx - radius) * w, (centery - cpOffset) * h,
      (centerx - cpOffset) * w, (centery - radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, centery * h, (centerx + cpOffset) * w, (centery - radius) * h,
      (centerx + radius) * w, (centery - cpOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx + radius) * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, (centerx - cpOffset) * w, (centery + radius) * h,
      (centerx - radius) * w, (centery + cpOffset) * h));
    geo.spot1 = new go.Spot(.2, .25);
    geo.spot2 = new go.Spot(.6, .75);
    return geo;
  });

  go.Shape.defineFigureGenerator("XnorGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var radius = .5;
    var cpOffset = KAPPA * radius;
    var centerx = .2;
    var centery = .5;
    var fig = new go.PathFigure(.1 * w, 0, false);
    geo.add(fig);
  
    // Normal
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .1 * w, h, .35 * w, .25 * h, .35 * w, .75 * h));
    var fig2 = new go.PathFigure(.8 * w, .5 * h, true);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .2 * w, h, .7 * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .2 * w, 0, .45 * w, .75 * h, .45 * w, .25 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .8 * w, .5 * h, (centerx + cpOffset) * w, (centery - radius) * h,
      .7 * w, (centery - cpOffset) * h));
    radius = .1;
    cpOffset = KAPPA * .1;
    centerx = .9;
    centery = .5;
    var fig3 = new go.PathFigure((centerx - radius) * w, centery * h, true);
    geo.add(fig3);
    // Inversion
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx - radius) * w, (centery - cpOffset) * h,
      (centerx - cpOffset) * w, (centery - radius) * h));
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, centery * h, (centerx + cpOffset) * w, (centery - radius) * h,
      (centerx + radius) * w, (centery - cpOffset) * h));
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx + radius) * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, (centerx - cpOffset) * w, (centery + radius) * h,
      (centerx - radius) * w, (centery + cpOffset) * h));
    geo.spot1 = new go.Spot(.4, .25);
    geo.spot2 = new go.Spot(.65, .75);
    return geo;
  });
  
  go.Shape.defineFigureGenerator("XorGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var radius = .5;
    var cpOffset = KAPPA * radius;
    var centerx = .2;
    var centery = .5;
    var fig = new go.PathFigure(.1 * w, 0, false);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .1 * w, h, .35 * w, .25 * h, .35 * w, .75 * h));
    var fig2 = new go.PathFigure(.2 * w, 0, true);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, w, .5 * h, (centerx + cpOffset) * w, (centery - radius) * h,
      .9 * w, (centery - cpOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .2 * w, h, .9 * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .2 * w, 0, .45 * w, .75 * h, .45 * w, .25 * h).close());
    geo.spot1 = new go.Spot(.4, .25);
    geo.spot2 = new go.Spot(.8, .75);
    return geo;
  });

  go.Shape.defineFigureGenerator("NandGate", function(shape, w, h) {
    var geo = new go.Geometry();
    var cpxOffset = KAPPA * .5;
    var cpyOffset = KAPPA * .4;
    var cpOffset = KAPPA * .1;
    var radius = .1;
    var centerx = .9;
    var centery = .5;
    var fig = new go.PathFigure(.8 * w, .5 * h, true);
    geo.add(fig);
  
    // The gate body
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .4 * w, h, .8 * w, (.5 + cpyOffset) * h,
      (.4 + cpxOffset) * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .4 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .8 * w, .5 * h, (.4 + cpxOffset) * w, 0,
      .8 * w, (.5 - cpyOffset) * h));
    var fig2 = new go.PathFigure((centerx + radius) * w, centery * h, true);
    geo.add(fig2);
    // Inversion
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx + radius) * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, (centerx - cpOffset) * w, (centery + radius) * h,
      (centerx - radius) * w, (centery + cpOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx - radius) * w, (centery - cpOffset) * h,
      (centerx - cpOffset) * w, (centery - radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, (centery) * h, (centerx + cpOffset) * w, (centery - radius) * h,
      (centerx + radius) * w, (centery - cpOffset) * h));
    geo.spot1 = new go.Spot(0, .05);
    geo.spot2 = new go.Spot(.55, .95);
    return geo;
  });

  go.Shape.defineFigureGenerator("Inverter", function(shape, w, h) {
    var geo = new go.Geometry();
    var cpOffset = KAPPA * .1;
    var radius = .1;
    var centerx = .9;
    var centery = .5;
    var fig = new go.PathFigure(.8 * w, .5 * h, true);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .5 * h));
    var fig2 = new go.PathFigure((centerx + radius) * w, centery * h, true);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx + radius) * w, (centery + cpOffset) * h,
      (centerx + cpOffset) * w, (centery + radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, (centerx - cpOffset) * w, (centery + radius) * h,
      (centerx - radius) * w, (centery + cpOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx - radius) * w, (centery - cpOffset) * h,
      (centerx - cpOffset) * w, (centery - radius) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, centery * h, (centerx + cpOffset) * w, (centery - radius) * h,
      (centerx + radius) * w, (centery - cpOffset) * h));
    geo.spot1 = new go.Spot(0, .25);
    geo.spot2 = new go.Spot(.4, .75);
    return geo;
  });

  var sensorTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  
  var andTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "AndGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var orTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "OrGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var xorTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "XorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var norTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "NorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var xnorTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "XnorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var nandTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "NandGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var notTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Inverter", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

    console.log(this.diagram.model.nodeDataArray)
    // add the templates created above to myDiagram and palette
    this.diagram.model = new go.GraphLinksModel();

  this.diagram.nodeTemplateMap.add("input", inputTemplate);
  this.diagram.nodeTemplateMap.add("output", outputTemplate);
  this.diagram.nodeTemplateMap.add("sensor" , sensorTemplate);
  this.diagram.nodeTemplateMap.add("and", andTemplate);
  this.diagram.nodeTemplateMap.add("or", orTemplate);
  this.diagram.nodeTemplateMap.add("xor", xorTemplate);
  this.diagram.nodeTemplateMap.add("not", notTemplate);
  this.diagram.nodeTemplateMap.add("nand", nandTemplate);
  this.diagram.nodeTemplateMap.add("nor", norTemplate);
  this.diagram.nodeTemplateMap.add("xnor", xnorTemplate);


  // share the template map with the Palette
  palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

  palette.model.nodeDataArray = [
    { category: "input" },
    { category: "output" },
    { category: "sensor" },
    { category: "and" },
    { category: "or" },
    { category: "xor" },
    { category: "not" },
    { category: "nand" },
    { category: "nor" },
    { category: "xnor" }
  ];


  function save() {
    var inputValue = (<HTMLInputElement>document.getElementById("mySavedModel")).value;
    inputValue = this.diagram.model.toJson();
    this.diagram.isModified = false;
  }
  function load() {
    this.diagram.model = go.Model.fromJson(
      (<HTMLInputElement>document.getElementById("mySavedModel")).value
      );
  }
  
  // update the diagram every 250 milliseconds
  function loop() {
    setTimeout(function() { updateStates(); loop(); }, 250);
  }
  
  // update the value and appearance of each node according to its type and input values
  function updateStates() {
    var oldskip = this.diagram.skipsUndoManager;
    this.diagram.skipsUndoManager = true;
    // do all "input" nodes first
    this.diagram.nodes.each(function(node) {
      if (node.category === "input") {
        doInput(node);
      }
    });

  // load the initial diagram
  load();


  // continually update the diagram
  loop();


  

  

// helper predicate
function linkIsTrue(link) {  // assume the given Link has a Shape named "SHAPE"
return link.findObject("SHAPE").stroke === this.green;
}

// helper function for propagating results
function setOutputLinks(node, color) {
node.findLinksOutOf().each(function(link) { link.findObject("SHAPE").stroke = color; });
}
function doInput(node) {
  // the output is just the node's Shape.fill
  setOutputLinks(node, node.findObject("NODESHAPE").fill);
}

function doAnd(node) {
  var color = node.findLinksInto().all(linkIsTrue) ? this.green : this.red;
  setOutputLinks(node, color);
}
function doNand(node) {
  var color = !node.findLinksInto().all(linkIsTrue) ? this.green : this.red;
  setOutputLinks(node, color);
}
function doNot(node) {
  var color = !node.findLinksInto().all(linkIsTrue) ? this.green : this.red;
  setOutputLinks(node, color);
}

function doOr(node) {
  var color = node.findLinksInto().any(linkIsTrue) ? this.green : this.red;
  setOutputLinks(node, color);
}
function doNor(node) {
  var color = !node.findLinksInto().any(linkIsTrue) ? this.green : this.red;
  setOutputLinks(node, color);
}

function doXor(node) {
  var truecount = 0;
  node.findLinksInto().each(function(link) { if (linkIsTrue(link)) truecount++; });
  var color = truecount % 2 !== 0 ? this.green : this.red;
  setOutputLinks(node, color);
}
function doXnor(node) {
  var truecount = 0;
  node.findLinksInto().each(function(link) { if (linkIsTrue(link)) truecount++; });
  var color = truecount % 2 === 0 ? this.green : this.red;
  setOutputLinks(node, color);
}

function doOutput(node) {
  // assume there is just one input link
  // we just need to update the node's Shape.fill
  node.linksConnected.each(function(link) { node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke; });
}
// save a model to and load a model from JSON text, displayed below the Diagram

  // now we can do all other kinds of nodes
  this.diagram.nodes.each(function(node) {
    switch (node.category) {
      case "and": doAnd(node); break;
      case "or": doOr(node); break;
      case "xor": doXor(node); break;
      case "not": doNot(node); break;
      case "nand": doNand(node); break;
      case "nor": doNor(node); break;
      case "xnor": doXnor(node); break;
      case "output": doOutput(node); break;
      case "input": break;  // doInput already called, above
    }
  });
  this.diagram.skipsUndoManager = oldskip;
}

    // // when the selection changes, emit event to app-component updating the selected node
    // this.diagram.addDiagramListener('ChangedSelection', (e) => {
    //   const node = this.diagram.selection.first();
    //   this.nodeClicked.emit(node);
    // });
  }

}
