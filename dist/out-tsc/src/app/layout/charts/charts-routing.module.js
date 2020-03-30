import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
const routes = [
    {
        path: '',
        component: ChartsComponent
    }
];
let ChartsRoutingModule = class ChartsRoutingModule {
};
ChartsRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ChartsRoutingModule);
export { ChartsRoutingModule };
//# sourceMappingURL=charts-routing.module.js.map