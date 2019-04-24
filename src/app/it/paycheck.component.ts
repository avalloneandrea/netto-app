import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { PaycheckService } from './paycheck.service';
import { fadeIn } from '../domain/animations';
import { Paycheck } from '../domain/paycheck';

@Component({
  selector: 'it-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.scss'],
  animations: [trigger('animate', [
    transition(':enter',
      query('.field, .level',
        useAnimation(fadeIn)))
  ])]
})
export class PaycheckComponent implements OnInit {

  form: FormGroup;
  paycheck$: Observable<Paycheck>;

  constructor(protected paycheckService: PaycheckService) {}

  ngOnInit() {
    this.form = new FormGroup({
      additionalSalaries: new FormControl(1),
      grossIncome: new FormControl(0),
      netBonus: new FormControl(0)
    });
  }

  onSubmit() {
    this.paycheck$ = this.paycheckService.getPaycheck(
      this.form.value.additionalSalaries,
      this.form.value.grossIncome,
      this.form.value.netBonus
    );
  }

  onReset() {
    this.paycheck$ = null;
    this.form.setValue({
      additionalSalaries: 1,
      grossIncome: 0,
      netBonus: 0
    });
  }

}
