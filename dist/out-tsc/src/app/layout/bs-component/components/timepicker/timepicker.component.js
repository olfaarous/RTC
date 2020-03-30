import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TimepickerComponent = class TimepickerComponent {
    constructor() {
        this.defaultTime = { hour: 13, minute: 30 };
        this.meridianTime = { hour: 13, minute: 30 };
        this.meridian = true;
        this.SecondsTime = { hour: 13, minute: 30, second: 30 };
        this.seconds = true;
        this.customTime = { hour: 13, minute: 30, second: 0 };
        this.hourStep = 1;
        this.minuteStep = 15;
        this.secondStep = 30;
    }
    toggleSeconds() {
        this.seconds = !this.seconds;
    }
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
};
TimepickerComponent = __decorate([
    Component({
        selector: 'app-timepicker',
        templateUrl: './timepicker.component.html',
        styleUrls: ['./timepicker.component.scss']
    })
], TimepickerComponent);
export { TimepickerComponent };
//# sourceMappingURL=timepicker.component.js.map