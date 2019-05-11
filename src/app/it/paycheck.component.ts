import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { fadeIn } from '../domain/animations';
import { Paycheck } from '../domain/paycheck';
import { PaycheckService } from './paycheck.service';

@Component({
  selector: 'it-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.scss'],
  animations: [trigger('animate', [
    transition(':enter',
      query('.panel > *',
        useAnimation(fadeIn)))
  ])]
})
export class PaycheckComponent implements OnInit {

  form: FormGroup;
  paycheck$: Subject<Paycheck>;

  constructor(private paycheckService: PaycheckService) {}

  ngOnInit() {
    this.form = new FormGroup({
      additionalSalaries: new FormControl(1),
      grossIncome: new FormControl(),
      netBonus: new FormControl()
    });
    this.paycheck$ = new Subject();
  }

  onSubmit() {
    this.form.disable();
    this.paycheckService.getPaycheck(
      this.form.value.additionalSalaries,
      this.form.value.grossIncome,
      this.form.value.netBonus
    ).pipe(
      take(1),
      finalize(() => this.form.enable())
    ).subscribe(paycheck => {
      this.paycheck$.next(paycheck);
    });
  }

  onBack() {
    this.paycheck$.next(null);
  }

}
