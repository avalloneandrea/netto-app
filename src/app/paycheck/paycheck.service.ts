import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Paycheck } from "../domain/paycheck";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaycheckService {

  constructor(protected httpClient: HttpClient) {}

  getPaycheck({ grossIncome = 0, additionalSalaries = 0, netBonus = 0 }): Observable<Paycheck> {
    const params = new HttpParams()
      .set('grossIncome', grossIncome as any)
      .set('additionalSalaries', additionalSalaries as any)
      .set('netBonus', netBonus as any);
    const headers = new HttpHeaders()
      .set('Accept', [ 'application/json' ]);
    return this.httpClient.get(`${ environment.basePath }/it/paycheck`, { params, headers });
  }

}
