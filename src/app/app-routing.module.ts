import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaycheckFormComponent } from './paycheck-form/paycheck-form.component';
import { PaycheckDetailComponent } from './paycheck-detail/paycheck-detail.component';
import { PaycheckResolve } from './paycheck-service/paycheck.resolve';

const routes: Routes = [
  { path: '', component: PaycheckFormComponent },
  { path: 'paycheck', component: PaycheckDetailComponent, resolve: { paycheck: PaycheckResolve } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
