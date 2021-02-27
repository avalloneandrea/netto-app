import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaycheckComponent } from './it/paycheck.component';

const routes: Routes = [
  { path: 'it', component: PaycheckComponent },
  { path: '**', redirectTo: '/it', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
