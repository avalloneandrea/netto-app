import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { PaycheckService } from './paycheck.service';

describe('PaycheckService', () => {

  let service: PaycheckService;
  let backend: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [PaycheckService]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PaycheckService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeDefined();
  });

  it('should return the paycheck given the additional salaries', () => {
    service.getPaycheck(1).subscribe();
    const request = backend.expectOne(`${environment.basePath}/it/paycheck?additionalSalaries=1`);
    expect(request).toBeDefined();
  });

  it('should return the paycheck given the gross income', () => {
    service.getPaycheck(null, 20000).subscribe();
    const request = backend.expectOne(`${environment.basePath}/it/paycheck?grossIncome=20000`);
    expect(request).toBeDefined();
  });

  it('should return the paycheck given the net bonus', () => {
    service.getPaycheck(null, null, 600).subscribe();
    const request = backend.expectOne(`${environment.basePath}/it/paycheck?netBonus=600`);
    expect(request).toBeDefined();
  });

});
