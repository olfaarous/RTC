import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
let SignupModule = class SignupModule {
};
SignupModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TranslateModule,
            SignupRoutingModule
        ],
        declarations: [SignupComponent]
    })
], SignupModule);
export { SignupModule };
//# sourceMappingURL=signup.module.js.map