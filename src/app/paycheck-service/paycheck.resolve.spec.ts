import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { PaycheckResolve } from './paycheck.resolve';
import { PaycheckService } from './paycheck.service';
import Spy = jasmine.Spy;

describe('PaycheckResolve', () => {

  let resolve: PaycheckResolve;
  let service: Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    }).compileComponents();
  }));

  beforeEach(() => {
    resolve = TestBed.inject(PaycheckResolve);
    service = spyOn(TestBed.inject(PaycheckService), 'getPaycheck')
      .and.returnValue(of({}));
  });

  it('should create the resolve', () => {
    expect(resolve).toBeDefined();
  });

  it('should resolve the request', () => {
    resolve.resolve(<ActivatedRouteSnapshot>{ queryParams: {} }, <RouterStateSnapshot>{});
    expect(service).toHaveBeenCalledTimes(1);
  });

});
