import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
let ChartsModule = class ChartsModule {
};
ChartsModule = __decorate([
    NgModule({
        imports: [CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule],
        declarations: [ChartsComponent]
    })
], ChartsModule);
export { ChartsModule };
//# sourceMappingURL=charts.module.js.map