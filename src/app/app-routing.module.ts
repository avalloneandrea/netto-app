import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaycheckComponent } from './it/paycheck.component';

const routes: Routes = [
  { path: '', redirectTo: '/it', pathMatch: 'full' },
  { path: 'it', component: PaycheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
