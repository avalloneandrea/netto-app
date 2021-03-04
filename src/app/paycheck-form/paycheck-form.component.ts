import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { fadeIn } from '../domain/animations';

@Component({
  selector: 'paycheck-form',
  templateUrl: './paycheck-form.component.html',
  styleUrls: ['./paycheck-form.component.scss'],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.block > *',
        useAnimation(fadeIn)))
  ]) ]
})
export class PaycheckFormComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      additionalSalaries: new FormControl(1),
      grossIncome: new FormControl(),
      netBonus: new FormControl()
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.router.navigate([ 'paycheck' ], { queryParams: this.form.value });
  }

}
