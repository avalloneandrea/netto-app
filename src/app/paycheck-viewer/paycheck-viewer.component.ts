import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { fadeIn } from '../app-animations';
import { Paycheck } from '../domain/paycheck';

@Component({
  selector: 'paycheck-viewer',
  templateUrl: './paycheck-viewer.component.html',
  styleUrls: [ './paycheck-viewer.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.columns',
        useAnimation(fadeIn)))
  ]) ]
})
export class PaycheckViewerComponent {

  paycheck?: Paycheck;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.paycheck = this.route.snapshot.data['paycheck'];
  }

  onBack(): void {
    this.router.navigate([ 'paycheck-dashboard' ], { queryParams: this.route.snapshot.queryParams });
  }

}
