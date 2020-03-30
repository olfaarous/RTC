import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
let LoginComponent = class LoginComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        animations: [routerTransition()]
    }),
    __metadata("design:paramtypes", [Router])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map