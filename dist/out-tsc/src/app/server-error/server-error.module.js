import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerErrorComponent } from './server-error.component';
let ServerErrorModule = class ServerErrorModule {
};
ServerErrorModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ServerErrorRoutingModule
        ],
        declarations: [ServerErrorComponent]
    })
], ServerErrorModule);
export { ServerErrorModule };
//# sourceMappingURL=server-error.module.js.map