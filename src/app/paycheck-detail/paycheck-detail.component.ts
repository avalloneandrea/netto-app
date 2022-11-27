import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { fadeIn } from '../app-animations';
import { Paycheck } from '../domain/paycheck';

@Component({
  selector: 'paycheck-detail',
  templateUrl: './paycheck-detail.component.html',
  styleUrls: [ './paycheck-detail.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.columns',
        useAnimation(fadeIn)))
  ]) ]
})
export class PaycheckDetailComponent {

  paycheck?: Paycheck;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.paycheck = this.route.snapshot.data['paycheck'];
  }

  onBack(): void {
    this.router.navigate([ '' ]);
  }

}
