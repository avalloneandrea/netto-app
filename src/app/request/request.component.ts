import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { fadeIn } from '../domain/animations';
import { Router } from "@angular/router";

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: [ './request.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.block > *',
        useAnimation(fadeIn)))
  ]) ]
})
export class RequestComponent implements OnInit {

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
