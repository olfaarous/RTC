import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsComponentComponent } from './bs-component.component';
const routes = [
    {
        path: '',
        component: BsComponentComponent
    }
];
let BsComponentRoutingModule = class BsComponentRoutingModule {
};
BsComponentRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BsComponentRoutingModule);
export { BsComponentRoutingModule };
//# sourceMappingURL=bs-component-routing.module.js.map