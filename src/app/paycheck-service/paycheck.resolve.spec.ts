import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { PaycheckResolve } from './paycheck.resolve';
import { environment } from '../../environments/environment';

describe('PaycheckResolve', () => {

  let resolve: PaycheckResolve;
  let backend: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [ PaycheckResolve ]
    }).compileComponents();
  }));

  beforeEach(() => {
    resolve = TestBed.inject(PaycheckResolve);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should create the resolve', () => {
    expect(resolve).toBeDefined();
  });

  it('should resolve the request', () => {
    const queryParams: any = {
      grossIncome: 20000,
      additionalSalaries: 1,
      netBonus: 600
    };
    resolve.resolve({ queryParams } as ActivatedRouteSnapshot, null).subscribe();
    const request = backend.expectOne(`${ environment.basePath }/paycheck?grossIncome=20000&additionalSalaries=1&netBonus=600`);
    expect(request).toBeDefined();
  });

});
