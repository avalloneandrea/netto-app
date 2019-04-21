import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ItService } from './it.service';
import { Paycheck } from '../domain/paycheck';

@Component({
  selector: 'it',
  templateUrl: './it.component.html',
  styleUrls: ['./it.component.scss']
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
