import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
let PaginationComponent = class PaginationComponent {
    constructor() {
        this.defaultPagination = 1;
        this.advancedPagination = 1;
        this.paginationSize = 1;
        this.disabledPagination = 1;
        this.isDisabled = true;
    }
    toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }
};
PaginationComponent = __decorate([
    Component({
        selector: 'app-pagination',
        templateUrl: './pagination.component.html',
        styleUrls: ['./pagination.component.scss']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map