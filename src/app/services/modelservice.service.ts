import { Injectable } from '@angular/core';
import * as go from 'gojs';

@Injectable({
  providedIn: 'root'
})
export class ModelserviceService {

  constructor() { }

  public selectedNode = null;

  public model: go.GraphLinksModel = new go.GraphLinksModel(
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

  public setSelectedNode(node) {
    this.selectedNode = node;
  }
}
