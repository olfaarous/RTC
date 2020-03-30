import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
let AlertComponent = class AlertComponent {
    constructor() {
        this.alerts = [];
        this.alerts.push({
            id: 1,
            type: 'success',
            message: 'This is an success alert',
        }, {
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        }, {
            id: 3,
            type: 'warning',
            message: 'This is a warning alert',
        }, {
            id: 4,
            type: 'danger',
            message: 'This is a danger alert',
        });
    }
    ngOnInit() { }
    closeAlert(alert) {
        const index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
};
AlertComponent = __decorate([
    Component({
        selector: 'app-alert',
        templateUrl: './alert.component.html',
        styleUrls: ['./alert.component.scss']
    }),
    __metadata("design:paramtypes", [])
], AlertComponent);
export { AlertComponent };
//# sourceMappingURL=alert.component.js.map