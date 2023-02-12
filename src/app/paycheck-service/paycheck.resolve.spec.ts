import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { PaycheckResolve } from './paycheck.resolve';
import { PaycheckService } from './paycheck.service';

describe('PaycheckResolve', () => {

  const queryParams = {
    grossIncome: 20000,
    additionalSalaries: 1,
    netAllowance: 100,
  };

  const service = jasmine.createSpyObj('PaycheckService', [ 'getPaycheck' ]);

  let resolve: PaycheckResolve;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: PaycheckService, useValue: service } ],
    }).compileComponents();
    resolve = TestBed.inject(PaycheckResolve);
  }));

  it('should be created', waitForAsync(() => {
    expect(resolve).toBeDefined();
  }));

  it('should resolve the requests', waitForAsync(() => {
    service.getPaycheck.and.returnValue(of({}));
    resolve.resolve({ queryParams: queryParams as Params } as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(service.getPaycheck).toHaveBeenCalledWith(queryParams);
  }));

});
