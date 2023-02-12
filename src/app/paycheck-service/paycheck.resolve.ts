import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Paycheck } from '../core/paycheck';
import { PaycheckService } from './paycheck.service';

@Injectable({ providedIn: 'root' })
export class PaycheckResolve implements Resolve<Paycheck> {

  constructor(private service: PaycheckService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paycheck> {
    return this.service.getPaycheck(route.queryParams)
      .pipe(take(1));
  }

}
