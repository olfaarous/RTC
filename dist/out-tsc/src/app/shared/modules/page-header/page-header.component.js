import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let PageHeaderComponent = class PageHeaderComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "heading", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "icon", void 0);
PageHeaderComponent = __decorate([
    Component({
        selector: 'app-page-header',
        templateUrl: './page-header.component.html',
        styleUrls: ['./page-header.component.scss']
    }),
    __metadata("design:paramtypes", [])
], PageHeaderComponent);
export { PageHeaderComponent };
//# sourceMappingURL=page-header.component.js.map