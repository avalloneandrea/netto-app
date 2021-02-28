import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { Paycheck } from '../domain/paycheck';
import { ResponseComponent } from './response.component';

describe('ResponseComponent', () => {

  let fixture: ComponentFixture<ResponseComponent>;
  let component: ResponseComponent;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    const paycheck: Paycheck = {
      grossIncome: 1500,
      taxes: [ { code: 'TAX', value: 400 } ],
      credits: [ { code: 'CREDIT', value: 100 } ],
      netIncome: 1200
    };
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '**', component: ResponseComponent },
        ]),
        TranslateModule.forRoot(),
      ],
      declarations: [ ResponseComponent ],
      providers: [ {
        provide: ActivatedRoute,
        useValue: { snapshot: { data: { paycheck } } }
      } ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the title', () => {
    expect(compiled.querySelector('.title').textContent).toContain('PAYCHECK');
  });

  it('should display the gross income', () => {
    const element = compiled.querySelectorAll('.columns')[1];
    expect(element.querySelectorAll('p')[0].textContent).toContain('GROSS_INCOME');
    expect(element.querySelectorAll('p')[1].textContent).toContain('GROSS_INCOME_HELP');
    expect(element.querySelectorAll('p')[2].textContent).toContain('1,500.00');
  });

  it('should display the taxes', () => {
    const element = compiled.querySelectorAll('.columns')[2];
    expect(element.querySelectorAll('p')[0].textContent).toContain('TAX');
    expect(element.querySelectorAll('p')[1].textContent).toContain('TAX_HELP');
    expect(element.querySelectorAll('p')[2].textContent).toContain('- 400.00');
  });

  it('should display the credits', () => {
    const element = compiled.querySelectorAll('.columns')[3];
    expect(element.querySelectorAll('p')[0].textContent).toContain('CREDIT');
    expect(element.querySelectorAll('p')[1].textContent).toContain('CREDIT_HELP');
    expect(element.querySelectorAll('p')[2].textContent).toContain('+ 100.00');
  });

  it('should display the net income', () => {
    const element = compiled.querySelectorAll('.columns')[4];
    expect(element.querySelectorAll('p')[0].textContent).toContain('NET_INCOME');
    expect(element.querySelectorAll('p')[1].textContent).toContain('NET_INCOME_HELP');
    expect(element.querySelectorAll('p')[2].textContent).toContain('1,200.00');
  });

  it('should display the back button', () => {
    expect(compiled.querySelector('button').textContent).toContain('BACK');
  });

  describe('when the back button has been clicked', () => {

    let navigateMethod;

    beforeEach(() => {
      navigateMethod = spyOn(TestBed.inject(Router), 'navigate');
      compiled.querySelector('button').click();
      fixture.detectChanges();
    });

    it('should trigger the navigation', () => {
      expect(navigateMethod).toHaveBeenCalled();
    });

  });

});
