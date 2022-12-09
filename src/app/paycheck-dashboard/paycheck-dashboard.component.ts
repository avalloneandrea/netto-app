import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { fadeIn } from '../app-animations';

@Component({
  selector: 'paycheck-dashboard',
  templateUrl: './paycheck-dashboard.component.html',
  styleUrls: [ './paycheck-dashboard.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.field',
        useAnimation(fadeIn)))
  ]) ]
})
export class PaycheckDashboardComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      grossIncome: [ 0 ],
      additionalSalaries: [ 1 ],
      netBonus: [ 0 ]
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.router.navigate([ 'paycheck' ], { queryParams: this.form.value });
  }

}
