import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from './layout.module';
describe('LayoutComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LayoutModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=layout.component.spec.js.map