import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
let AccessDeniedModule = class AccessDeniedModule {
};
AccessDeniedModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            AccessDeniedRoutingModule
        ],
        declarations: [AccessDeniedComponent]
    })
], AccessDeniedModule);
export { AccessDeniedModule };
//# sourceMappingURL=access-denied.module.js.map