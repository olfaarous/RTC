import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
let FormModule = class FormModule {
};
FormModule = __decorate([
    NgModule({
        imports: [CommonModule, FormRoutingModule, PageHeaderModule],
        declarations: [FormComponent]
    })
], FormModule);
export { FormModule };
//# sourceMappingURL=form.module.js.map