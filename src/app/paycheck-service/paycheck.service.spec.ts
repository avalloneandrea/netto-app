import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { PaycheckService } from './paycheck.service';

describe('PaycheckService', () => {

  let service: PaycheckService;
  let http: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    }).compileComponents();
    service = TestBed.inject(PaycheckService);
    http = TestBed.inject(HttpTestingController);
  }));

  it('should be created', waitForAsync(() => {
    expect(service).toBeDefined();
  }));

  it('should return the paycheck given the gross income', waitForAsync(() => {
    service.getPaycheck({ grossIncome: 20000 }).subscribe();
    const request = http.expectOne(`${environment.apiUrl}/paycheck?grossIncome=20000&additionalSalaries=0&netAllowance=0`);
    expect(request.request.method).toEqual('GET');
  }));

  it('should return the paycheck given the additional salaries', waitForAsync(() => {
    service.getPaycheck({ additionalSalaries: 1 }).subscribe();
    const request = http.expectOne(`${environment.apiUrl}/paycheck?grossIncome=0&additionalSalaries=1&netAllowance=0`);
    expect(request.request.method).toEqual('GET');
  }));

  it('should return the paycheck given the net allowance', waitForAsync(() => {
    service.getPaycheck({ netAllowance: 100 }).subscribe();
    const request = http.expectOne(`${environment.apiUrl}/paycheck?grossIncome=0&additionalSalaries=0&netAllowance=100`);
    expect(request.request.method).toEqual('GET');
  }));

  afterEach(waitForAsync(() => {
    http.verify();
  }));

});
