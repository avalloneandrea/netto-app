import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestComponent } from './request/request.component';
import { ResponseComponent } from './response/response.component';
import { PaycheckResolve } from './paycheck/paycheck.resolve';

const routes: Routes = [
  { path: '', component: RequestComponent },
  { path: 'paycheck', component: ResponseComponent, resolve: { paycheck: PaycheckResolve } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
