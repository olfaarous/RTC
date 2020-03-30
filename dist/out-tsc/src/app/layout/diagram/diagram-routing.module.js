import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DiagramComponent } from './diagram.component';
const routes = [
    {
        path: '', component: DiagramComponent
    }
];
let DiagramRoutingModule = class DiagramRoutingModule {
};
DiagramRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], DiagramRoutingModule);
export { DiagramRoutingModule };
//# sourceMappingURL=diagram-routing.module.js.map