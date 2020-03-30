import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramRoutingModule } from './diagram-routing.module';
import { DiagramComponent } from './diagram.component';
let DiagramModule = class DiagramModule {
};
DiagramModule = __decorate([
    NgModule({
        declarations: [DiagramComponent],
        imports: [
            CommonModule,
            DiagramRoutingModule
        ]
    })
], DiagramModule);
export { DiagramModule };
//# sourceMappingURL=diagram.module.js.map