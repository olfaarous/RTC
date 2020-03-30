import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let StatComponent = class StatComponent {
    constructor() {
        this.event = new EventEmitter();
    }
    ngOnInit() { }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], StatComponent.prototype, "bgClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StatComponent.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], StatComponent.prototype, "count", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StatComponent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], StatComponent.prototype, "data", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], StatComponent.prototype, "event", void 0);
StatComponent = __decorate([
    Component({
        selector: 'app-stat',
        templateUrl: './stat.component.html',
        styleUrls: ['./stat.component.scss']
    }),
    __metadata("design:paramtypes", [])
], StatComponent);
export { StatComponent };
//# sourceMappingURL=stat.component.js.map