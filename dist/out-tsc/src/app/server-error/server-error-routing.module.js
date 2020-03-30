import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerErrorComponent } from './server-error.component';
const routes = [
    {
        path: '', component: ServerErrorComponent
    }
];
let ServerErrorRoutingModule = class ServerErrorRoutingModule {
};
ServerErrorRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ServerErrorRoutingModule);
export { ServerErrorRoutingModule };
//# sourceMappingURL=server-error-routing.module.js.map