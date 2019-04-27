import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { fadeIn } from '../domain/animations';
import { Paycheck } from '../domain/paycheck';
import { PaycheckService } from './paycheck.service';

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
  loading$: Subject<boolean>;
  paycheck$: Subject<Paycheck>;

  constructor(private paycheckService: PaycheckService) {}

  ngOnInit() {
    this.form = new FormGroup({
      additionalSalaries: new FormControl(1),
      grossIncome: new FormControl(0),
      netBonus: new FormControl(0)
    });
    this.loading$ = new Subject();
    this.paycheck$ = new Subject();
  }

  onSubmit() {

    timer(1000).pipe(
      takeUntil(this.paycheck$)
    ).subscribe(response => {
      this.loading$.next(true);
    });

    this.paycheckService.getPaycheck(
      this.form.value.additionalSalaries,
      this.form.value.grossIncome,
      this.form.value.netBonus
    ).pipe(
      take(1),
    ).subscribe(paycheck => {
      this.loading$.next(false);
      this.paycheck$.next(paycheck);
    });

  }

  onBack() {
    this.paycheck$.next(null);
  }

}
