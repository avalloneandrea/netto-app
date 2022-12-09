import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaycheckDashboardComponent } from './paycheck-dashboard/paycheck-dashboard.component';
import { PaycheckViewerComponent } from './paycheck-viewer/paycheck-viewer.component';
import { PaycheckResolve } from './paycheck-service/paycheck.resolve';

const routes: Routes = [
  { path: '', component: PaycheckDashboardComponent },
  { path: 'paycheck', component: PaycheckViewerComponent, resolve: { paycheck: PaycheckResolve } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
