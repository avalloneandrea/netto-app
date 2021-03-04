import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

import { PaycheckService } from './paycheck-service/paycheck.service';
import { version } from '../../package.json';

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
      .subscribe();
  }

}
