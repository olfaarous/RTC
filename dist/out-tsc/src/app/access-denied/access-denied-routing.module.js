import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied.component';
const routes = [
    {
        path: '', component: AccessDeniedComponent
    }
];
let AccessDeniedRoutingModule = class AccessDeniedRoutingModule {
};
AccessDeniedRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AccessDeniedRoutingModule);
export { AccessDeniedRoutingModule };
//# sourceMappingURL=access-denied-routing.module.js.map