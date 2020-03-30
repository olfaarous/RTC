import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
let TablesModule = class TablesModule {
};
TablesModule = __decorate([
    NgModule({
        imports: [CommonModule, TablesRoutingModule, PageHeaderModule],
        declarations: [TablesComponent]
    })
], TablesModule);
export { TablesModule };
//# sourceMappingURL=tables.module.js.map