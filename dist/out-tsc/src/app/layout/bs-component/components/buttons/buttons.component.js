import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let ButtonsComponent = class ButtonsComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.model = 1;
    }
    ngOnInit() {
        this.radioGroupForm = this.formBuilder.group({
            model: 'middle'
        });
    }
};
ButtonsComponent = __decorate([
    Component({
        selector: 'app-buttons',
        templateUrl: './buttons.component.html',
        styleUrls: ['./buttons.component.scss']
    }),
    __metadata("design:paramtypes", [FormBuilder])
], ButtonsComponent);
export { ButtonsComponent };
//# sourceMappingURL=buttons.component.js.map