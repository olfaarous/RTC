import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
const routes = [
    {
        path: '', component: TablesComponent
    }
];
let TablesRoutingModule = class TablesRoutingModule {
};
TablesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TablesRoutingModule);
export { TablesRoutingModule };
//# sourceMappingURL=tables-routing.module.js.map