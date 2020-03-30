import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlankPageComponent } from './blank-page.component';
const routes = [
    {
        path: '',
        component: BlankPageComponent
    }
];
let BlankPageRoutingModule = class BlankPageRoutingModule {
};
BlankPageRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BlankPageRoutingModule);
export { BlankPageRoutingModule };
//# sourceMappingURL=blank-page-routing.module.js.map