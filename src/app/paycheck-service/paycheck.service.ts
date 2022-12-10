import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Paycheck } from '../domain/paycheck';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaycheckService {

  constructor(private httpClient: HttpClient) {}

  getPaycheck({ grossIncome = 0, additionalSalaries = 0, netAllowance = 0 }): Observable<Paycheck> {
    const params = new HttpParams()
      .set('grossIncome', grossIncome)
      .set('additionalSalaries', additionalSalaries)
      .set('netAllowance', netAllowance);
    const headers = new HttpHeaders()
      .set('Accept', [ 'application/json' ]);
    return this.httpClient.get(`${environment.apiUrl}/paycheck`, { params, headers });
  }

}
