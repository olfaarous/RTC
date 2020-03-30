import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let BsElementModule = class BsElementModule {
};
BsElementModule = __decorate([
    NgModule({
        imports: [CommonModule, BsElementRoutingModule, PageHeaderModule, NgbModule],
        declarations: [BsElementComponent]
    })
], BsElementModule);
export { BsElementModule };
//# sourceMappingURL=bs-element.module.js.map