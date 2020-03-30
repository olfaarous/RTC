import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridComponent } from './grid.component';
const routes = [
    {
        path: '', component: GridComponent
    }
];
let GridRoutingModule = class GridRoutingModule {
};
GridRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], GridRoutingModule);
export { GridRoutingModule };
//# sourceMappingURL=grid-routing.module.js.map