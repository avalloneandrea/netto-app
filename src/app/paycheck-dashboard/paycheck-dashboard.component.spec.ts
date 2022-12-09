import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PaycheckDashboardComponent } from './paycheck-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import createSpyObj = jasmine.createSpyObj;

describe('PaycheckDashboardComponent', () => {

  let fixture: ComponentFixture<PaycheckDashboardComponent>;
  let component: PaycheckDashboardComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ PaycheckDashboardComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycheckDashboardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
    expect(component.form.value.grossIncome).toBeNull();
    expect(component.form.value.additionalSalaries).toEqual(1);
    expect(component.form.value.netBonus).toBeNull();
  });

  it('should display the gross income field', () => {
    const field = element.querySelectorAll('.field')[0];
    expect(field.querySelector('label').textContent).toContain('GROSS_INCOME');
    expect(field.querySelector('input').placeholder).toEqual('0');
  });

  it('should display the num of salaries field', () => {
    const field = element.querySelectorAll('.field')[1];
    expect(field.querySelector('label').textContent).toContain('NUM_OF_SALARIES');
    expect(field.querySelector('select').value).toEqual('1');
  });

  it('should display the net bonus field', () => {
    const field = element.querySelectorAll('.field')[2];
    expect(field.querySelector('label').textContent).toContain('NET_BONUS');
    expect(field.querySelector('input').placeholder).toEqual('0');
  });

  it('should display the submit button', () => {
    expect(element.querySelector('button').textContent).toContain('SUBMIT');
  });

  describe('when the submit button has been clicked', () => {

    let router;

    beforeEach(() => {
      router = spyOn(TestBed.inject(Router), 'navigate');
      element.querySelector('button').click();
      fixture.detectChanges();
    });

    it('should disable the form', () => {
      expect(component.form.disabled).toBeTruthy();
    });

    it('should trigger the navigation', () => {
      expect(router).toHaveBeenCalledTimes(1);
    });

  });

  describe('when the viewer back button has been clicked', () => {

    beforeEach(() => {
      TestBed.inject(ActivatedRoute).snapshot.queryParams = createSpyObj('queryParams', {}, {
        grossIncome: 20000,
        netBonus: 500
      });
      fixture = TestBed.createComponent(PaycheckDashboardComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should display the gross income field', () => {
      const field = element.querySelectorAll('.field')[0];
      expect(field.querySelector('label').textContent).toContain('GROSS_INCOME');
      expect(field.querySelector('input').value).toEqual('20000');
    });

    it('should display the net bonus field', () => {
      const field = element.querySelectorAll('.field')[2];
      expect(field.querySelector('label').textContent).toContain('NET_BONUS');
      expect(field.querySelector('input').value).toEqual('500');
    });

  });

});
