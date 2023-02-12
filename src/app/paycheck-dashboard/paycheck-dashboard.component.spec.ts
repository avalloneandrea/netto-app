import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PaycheckViewerComponent } from '../paycheck-viewer/paycheck-viewer.component';
import { PaycheckDashboardComponent } from './paycheck-dashboard.component';

describe('PaycheckDashboardComponent', () => {

  let fixture: ComponentFixture<PaycheckDashboardComponent>;
  let router: Router;
  let component: PaycheckDashboardComponent;
  let element: HTMLElement;

  describe('using default params', () => {

    const defaultParams = {
      grossIncome: null,
      additionalSalaries: 1,
      netAllowance: null,
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ PaycheckDashboardComponent ],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'paycheck-viewer', component: PaycheckViewerComponent } ]),
          TranslateModule.forRoot(),
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(PaycheckDashboardComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }));

    it('should be created', waitForAsync(() => {
      expect(component).toBeDefined();
      expect(component.form.value).toEqual(defaultParams);

      const grossIncome = element.querySelectorAll('.field')[0];
      expect(grossIncome.querySelector('label').textContent).toContain('GROSS_INCOME');
      expect(grossIncome.querySelector('input').placeholder).toEqual('0');

      const additionalSalaries = element.querySelectorAll('.field')[1];
      expect(additionalSalaries.querySelector('label').textContent).toContain('NUM_OF_SALARIES');
      expect(additionalSalaries.querySelector('select').value).toEqual('1');

      const netAllowance = element.querySelectorAll('.field')[2];
      expect(netAllowance.querySelector('label').textContent).toContain('NET_ALLOWANCE');
      expect(netAllowance.querySelector('input').placeholder).toEqual('0');

      expect(element.querySelector('button').textContent).toContain('SUBMIT');
    }));

    it('should navigate to the viewer component', waitForAsync(() => {
      component.onSubmit();
      fixture.whenStable().then(() => {
        expect(component.form.disabled).toBeTruthy();
        expect(router.url).toContain('/paycheck-viewer');
        expect(router.url).toContain(`additionalSalaries=1`);
      });
    }));

  });

  describe('using custom params', () => {

    const customParams = {
      grossIncome: 20000,
      additionalSalaries: 2,
      netAllowance: 100,
    };

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ PaycheckDashboardComponent ],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'paycheck-viewer', component: PaycheckViewerComponent } ]),
          TranslateModule.forRoot(),
        ],
        providers: [ { provide: ActivatedRoute, useValue: { snapshot: { queryParams: customParams } } } ],
      }).compileComponents();
      fixture = TestBed.createComponent(PaycheckDashboardComponent);
      router = TestBed.inject(Router);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }));

    it('should be created', waitForAsync(() => {
      expect(component).toBeDefined();
      expect(component.form.value).toEqual(customParams);

      const grossIncome = element.querySelectorAll('.field')[0];
      expect(grossIncome.querySelector('label').textContent).toContain('GROSS_INCOME');
      expect(grossIncome.querySelector('input').value).toEqual('20000');

      const additionalSalaries = element.querySelectorAll('.field')[1];
      expect(additionalSalaries.querySelector('label').textContent).toContain('NUM_OF_SALARIES');
      expect(additionalSalaries.querySelector('select').value).toEqual('2');

      const netAllowance = element.querySelectorAll('.field')[2];
      expect(netAllowance.querySelector('label').textContent).toContain('NET_ALLOWANCE');
      expect(netAllowance.querySelector('input').value).toEqual('100');

      expect(element.querySelector('button').textContent).toContain('SUBMIT');
    }));

    it('should navigate to the viewer component', waitForAsync(() => {
      component.onSubmit();
      fixture.whenStable().then(() => {
        expect(component.form.disabled).toBeTruthy();
        expect(router.url).toContain('/paycheck-viewer');
        expect(router.url).toContain(`grossIncome=20000`);
        expect(router.url).toContain(`additionalSalaries=2`);
        expect(router.url).toContain(`netAllowance=100`);
      });
    }));

  });

});
