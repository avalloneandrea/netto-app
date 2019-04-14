import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItComponent } from './it/it.component';

const routes: Routes = [
  { path: '', redirectTo: '/it', pathMatch: 'full' },
  { path: 'it', component: ItComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
