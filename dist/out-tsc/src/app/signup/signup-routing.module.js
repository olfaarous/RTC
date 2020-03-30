import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
const routes = [
    {
        path: '', component: SignupComponent
    }
];
let SignupRoutingModule = class SignupRoutingModule {
};
SignupRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], SignupRoutingModule);
export { SignupRoutingModule };
//# sourceMappingURL=signup-routing.module.js.map