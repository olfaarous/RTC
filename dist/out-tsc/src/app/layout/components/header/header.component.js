import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
let HeaderComponent = class HeaderComponent {
    constructor(translate, router) {
        this.translate = translate;
        this.router = router;
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }
    ngOnInit() {
        this.pushRightClass = 'push-right';
    }
    isToggled() {
        const dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }
    toggleSidebar() {
        const dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
    rltAndLtr() {
        const dom = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
    changeLang(language) {
        this.translate.use(language);
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    }),
    __metadata("design:paramtypes", [TranslateService, Router])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map