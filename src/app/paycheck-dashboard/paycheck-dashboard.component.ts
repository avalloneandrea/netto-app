import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    const queryParams = this.route.snapshot.queryParams;
    this.form = this.formBuilder.group({
      grossIncome: [ queryParams['grossIncome'] ],
      additionalSalaries: [ queryParams['additionalSalaries'] || 1 ],
      netBonus: [ queryParams['netBonus'] ]
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.router.navigate([ 'paycheck-viewer' ], { queryParams: this.form.value });
  }

}
