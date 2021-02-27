import { query, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { fadeIn } from '../domain/animations';
import { Paycheck } from '../domain/paycheck';

@Component({
  selector: 'response',
  templateUrl: './response.component.html',
  styleUrls: [ './response.component.scss' ],
  animations: [ trigger('animate', [
    transition(':enter',
      query('.block > *',
        useAnimation(fadeIn)))
  ]) ]
})
export class ResponseComponent implements OnInit {

  paycheck: Paycheck;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.paycheck = this.route.snapshot.data.paycheck;
  }

  onBack(): void {
    this.router.navigate([ '' ]);
  }

}
