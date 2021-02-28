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
      providers: [ PaycheckService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(PaycheckService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeDefined();
  });

  it('should return the paycheck given the gross income', () => {
    service.getPaycheck({ grossIncome: 20000 }).subscribe();
    const request = backend.expectOne(`${ environment.basePath }/paycheck?grossIncome=20000&additionalSalaries=0&netBonus=0`);
    expect(request).toBeDefined();
  });

  it('should return the paycheck given the additional salaries', () => {
    service.getPaycheck({ additionalSalaries: 1 }).subscribe();
    const request = backend.expectOne(`${ environment.basePath }/paycheck?grossIncome=0&additionalSalaries=1&netBonus=0`);
    expect(request).toBeDefined();
  });

  it('should return the paycheck given the net bonus', () => {
    service.getPaycheck({ netBonus: 600 }).subscribe();
    const request = backend.expectOne(`${ environment.basePath }/paycheck?grossIncome=0&additionalSalaries=0&netBonus=600`);
    expect(request).toBeDefined();
  });

});
