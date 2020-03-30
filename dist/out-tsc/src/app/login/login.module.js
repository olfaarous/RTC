import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            TranslateModule,
            LoginRoutingModule
        ],
        declarations: [LoginComponent]
    })
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map