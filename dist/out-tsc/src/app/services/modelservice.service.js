import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import * as go from 'gojs';
let ModelserviceService = class ModelserviceService {
    constructor() {
        this.selectedNode = null;
        this.model = new go.GraphLinksModel([
            { "category": "input", "key": "input1", "loc": "-150 -80" },
            { "category": "or", "key": "or1", "loc": "-70 0" },
            { "category": "not", "key": "not1", "loc": "10 0" },
            { "category": "xor", "key": "xor1", "loc": "100 0" },
            { "category": "or", "key": "or2", "loc": "200 0" },
            { "category": "output", "key": "output1", "loc": "200 -100" }
        ], [
            { "from": "input1", "fromPort": "out", "to": "or1", "toPort": "in1" },
            { "from": "or1", "fromPort": "out", "to": "not1", "toPort": "in" },
            { "from": "not1", "fromPort": "out", "to": "or1", "toPort": "in2" },
            { "from": "not1", "fromPort": "out", "to": "xor1", "toPort": "in1" },
            { "from": "xor1", "fromPort": "out", "to": "or2", "toPort": "in1" },
            { "from": "or2", "fromPort": "out", "to": "xor1", "toPort": "in2" },
            { "from": "xor1", "fromPort": "out", "to": "output1", "toPort": "" }
        ]);
    }
    setSelectedNode(node) {
        this.selectedNode = node;
    }
};
ModelserviceService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], ModelserviceService);
export { ModelserviceService };
//# sourceMappingURL=modelservice.service.js.map