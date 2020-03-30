import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsComponentRoutingModule } from './bs-component-routing.module';
import { BsComponentComponent } from './bs-component.component';
import { AlertComponent, ButtonsComponent, ModalComponent, CollapseComponent, DatePickerComponent, DropdownComponent, PaginationComponent, PopOverComponent, ProgressbarComponent, TabsComponent, RatingComponent, TooltipComponent, TimepickerComponent } from './components';
import { PageHeaderModule } from '../../shared';
let BsComponentModule = class BsComponentModule {
};
BsComponentModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            BsComponentRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            NgbModule,
            PageHeaderModule
        ],
        declarations: [
            BsComponentComponent,
            ButtonsComponent,
            AlertComponent,
            ModalComponent,
            CollapseComponent,
            DatePickerComponent,
            DropdownComponent,
            PaginationComponent,
            PopOverComponent,
            ProgressbarComponent,
            TabsComponent,
            RatingComponent,
            TooltipComponent,
            TimepickerComponent
        ]
    })
], BsComponentModule);
export { BsComponentModule };
//# sourceMappingURL=bs-component.module.js.map