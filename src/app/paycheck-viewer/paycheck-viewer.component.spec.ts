import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PaycheckDashboardComponent } from '../paycheck-dashboard/paycheck-dashboard.component';
import { PaycheckViewerComponent } from './paycheck-viewer.component';

describe('PaycheckViewerComponent', () => {

  const queryParams = {
    grossIncome: 20000,
    additionalSalaries: 1,
    netAllowance: 100,
  };

  const paycheck = {
    grossIncome: 1500,
    taxes: [ { code: 'TAX', value: 200 } ],
    credits: [ { code: 'CREDIT', value: 100 } ],
    netIncome: 1200,
  };

  let fixture: ComponentFixture<PaycheckViewerComponent>;
  let router: Router;
  let component: PaycheckViewerComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaycheckViewerComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'paycheck-dashboard', component: PaycheckDashboardComponent } ]),
        TranslateModule.forRoot(),
      ],
      providers: [ { provide: ActivatedRoute, useValue: { snapshot: { data: { paycheck }, queryParams } } } ],
    }).compileComponents();
    fixture = TestBed.createComponent(PaycheckViewerComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should be created', waitForAsync(() => {
    expect(component).toBeDefined();
    expect(element.querySelector('.title').textContent).toContain('PAYCHECK');

    const grossIncome = element.querySelectorAll('.columns')[1];
    expect(grossIncome.querySelectorAll('p')[0].textContent).toContain('GROSS_INCOME');
    expect(grossIncome.querySelectorAll('p')[1].textContent).toContain('GROSS_INCOME_HELP');
    expect(grossIncome.querySelectorAll('p')[2].textContent).toContain('1,500.00');

    const tax = element.querySelectorAll('.columns')[2];
    expect(tax.querySelectorAll('p')[0].textContent).toContain('TAX');
    expect(tax.querySelectorAll('p')[1].textContent).toContain('TAX_HELP');
    expect(tax.querySelectorAll('p')[2].textContent).toContain('- 200.00');

    const credit = element.querySelectorAll('.columns')[3];
    expect(credit.querySelectorAll('p')[0].textContent).toContain('CREDIT');
    expect(credit.querySelectorAll('p')[1].textContent).toContain('CREDIT_HELP');
    expect(credit.querySelectorAll('p')[2].textContent).toContain('+ 100.00');

    expect(element.querySelectorAll('.columns')[4].querySelector('hr')).toBeDefined();

    const netIncome = element.querySelectorAll('.columns')[5];
    expect(netIncome.querySelectorAll('p')[0].textContent).toContain('NET_INCOME');
    expect(netIncome.querySelectorAll('p')[1].textContent).toContain('NET_INCOME_HELP');
    expect(netIncome.querySelectorAll('p')[2].textContent).toContain('1,200.00');

    expect(element.querySelector('button').textContent).toContain('BACK');
  }));

  it('should navigate to the dashboard component', waitForAsync(() => {
    component.onBack();
    fixture.whenStable().then(() => {
      expect(router.url).toContain('/paycheck-dashboard');
      expect(router.url).toContain(`grossIncome=${queryParams.grossIncome}`);
      expect(router.url).toContain(`additionalSalaries=${queryParams.additionalSalaries}`);
      expect(router.url).toContain(`netAllowance=${queryParams.netAllowance}`);
    });
  }));

});
