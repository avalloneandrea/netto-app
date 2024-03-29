import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeIn } from '../app-animations';

@Component({
  selector: 'paycheck-dashboard',
  templateUrl: './paycheck-dashboard.component.html',
  styleUrls: [ './paycheck-dashboard.component.scss' ],
  animations: [
    trigger('animate', [
      transition(':enter',
        query('.field',
          useAnimation(fadeIn))) ]),
  ],
})
export class PaycheckDashboardComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.form = this.formBuilder.group({
      grossIncome: [ queryParams['grossIncome'], Validators.min(0) ],
      additionalSalaries: [ queryParams['additionalSalaries'] || 1, Validators.min(0) ],
      netAllowance: [ queryParams['netAllowance'], Validators.min(0) ],
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.router.navigate([ 'paycheck-viewer' ], { queryParams: this.form.value });
  }

}
