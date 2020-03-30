import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
let LayoutComponent = class LayoutComponent {
    constructor() { }
    ngOnInit() { }
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.scss']
    }),
    __metadata("design:paramtypes", [])
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map