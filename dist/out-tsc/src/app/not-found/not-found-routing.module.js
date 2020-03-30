import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
const routes = [
    {
        path: '', component: NotFoundComponent
    }
];
let NotFoundRoutingModule = class NotFoundRoutingModule {
};
NotFoundRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], NotFoundRoutingModule);
export { NotFoundRoutingModule };
//# sourceMappingURL=not-found-routing.module.js.map