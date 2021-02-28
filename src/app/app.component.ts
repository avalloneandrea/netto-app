import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

import { version } from '../../package.json';
import { PaycheckService } from './paycheck/paycheck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  appVersion: string = version;

  constructor(private service: PaycheckService) {
    this.service.getPaycheck({})
      .pipe(take(1))
      .subscribe(() => console.log('API is active'));
  }

}
