import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { query, transition, trigger, useAnimation } from '@angular/animations';

import { ItService } from './it.service';
import { Paycheck } from '../domain/paycheck';
import { fadeIn } from '../domain/animations';

@Component({
  selector: 'it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.scss'],
  animations: [trigger('animate', [
    transition(':enter',
      query('.field, .level',
        useAnimation(fadeIn)))
  ])]
})
export class ItComponent implements OnInit {

  form: FormGroup;
  paycheck$: Observable<Paycheck>;

  constructor(protected itService: ItService) {}

  ngOnInit() {
    this.form = new FormGroup({
      additionalSalaries: new FormControl(1),
      grossIncome: new FormControl(0),
      netBonus: new FormControl(0)
    });
  }

  onSubmit() {
    this.paycheck$ = this.itService.getPaycheck(
      this.form.value.additionalSalaries,
      this.form.value.grossIncome,
      this.form.value.netBonus
    );
  }

}
