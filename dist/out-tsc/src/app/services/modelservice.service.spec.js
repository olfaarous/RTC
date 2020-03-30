import { TestBed } from '@angular/core/testing';
import { ModelserviceService } from './modelservice.service';
describe('ModelserviceService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelserviceService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=modelservice.service.spec.js.map