import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from './../../shared';
let GridModule = class GridModule {
};
GridModule = __decorate([
    NgModule({
        imports: [CommonModule, GridRoutingModule, PageHeaderModule],
        declarations: [GridComponent]
    })
], GridModule);
export { GridModule };
//# sourceMappingURL=grid.module.js.map