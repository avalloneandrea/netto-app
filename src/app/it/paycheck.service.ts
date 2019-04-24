import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Paycheck } from '../domain/paycheck';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaycheckService {

  constructor(protected httpClient: HttpClient) {}

  getPaycheck(additionalSalaries?: number, grossIncome?: number, netBonus?: number): Observable<Paycheck> {

    let params = new HttpParams();
    if (additionalSalaries !== undefined && additionalSalaries !== null)
      params = params.set('additionalSalaries', additionalSalaries as any);
    if (grossIncome !== undefined && grossIncome !== null)
      params = params.set('grossIncome', grossIncome as any);
    if (netBonus !== undefined && netBonus !== null)
      params = params.set('netBonus', netBonus as any);

    let headers = new HttpHeaders();
    headers = headers.set('Accept', ['application/json']);

    return this.httpClient.get<Paycheck>(`${environment.basePath}/it/paycheck`, { params, headers });

  }

}
