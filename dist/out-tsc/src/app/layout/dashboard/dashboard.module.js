import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TimelineComponent, NotificationComponent, ChatComponent } from './components';
import { StatModule } from '../../shared';
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            NgbCarouselModule,
            NgbAlertModule,
            DashboardRoutingModule,
            StatModule
        ],
        declarations: [
            DashboardComponent,
            TimelineComponent,
            NotificationComponent,
            ChatComponent
        ]
    })
], DashboardModule);
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map