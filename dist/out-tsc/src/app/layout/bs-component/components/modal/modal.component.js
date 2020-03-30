import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
let ModalComponent = class ModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    getDismissReason(reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return `with: ${reason}`;
        }
    }
};
ModalComponent = __decorate([
    Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.scss']
    }),
    __metadata("design:paramtypes", [NgbModal])
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map