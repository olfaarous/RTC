import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
};
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map