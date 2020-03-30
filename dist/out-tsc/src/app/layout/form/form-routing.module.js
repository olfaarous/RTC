import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
const routes = [
    {
        path: '', component: FormComponent
    }
];
let FormRoutingModule = class FormRoutingModule {
};
FormRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FormRoutingModule);
export { FormRoutingModule };
//# sourceMappingURL=form-routing.module.js.map