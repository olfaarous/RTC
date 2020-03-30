import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
let SidebarComponent = class SidebarComponent {
    constructor(translate, router) {
        this.translate = translate;
        this.router = router;
        this.collapsedEvent = new EventEmitter();
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }
    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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
    changeLang(language) {
        this.translate.use(language);
    }
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "collapsedEvent", void 0);
SidebarComponent = __decorate([
    Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss']
    }),
    __metadata("design:paramtypes", [TranslateService, Router])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map