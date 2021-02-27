import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { take } from "rxjs/operators";

import { Paycheck } from "../domain/paycheck";
import { PaycheckService } from "./paycheck.service";

@Injectable({
  providedIn: 'root'
})
export class PaycheckResolve implements Resolve<Paycheck> {

  constructor(private service: PaycheckService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getPaycheck(route.queryParams)
      .pipe(take(1));
  }

}
