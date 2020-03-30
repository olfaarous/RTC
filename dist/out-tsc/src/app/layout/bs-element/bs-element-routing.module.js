import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsElementComponent } from './bs-element.component';
const routes = [
    {
        path: '',
        component: BsElementComponent
    }
];
let BsElementRoutingModule = class BsElementRoutingModule {
};
BsElementRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BsElementRoutingModule);
export { BsElementRoutingModule };
//# sourceMappingURL=bs-element-routing.module.js.map