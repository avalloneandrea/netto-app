import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PaycheckViewerComponent } from './paycheck-viewer.component';
import createSpyObj = jasmine.createSpyObj;

describe('PaycheckViewerComponent', () => {

  let fixture: ComponentFixture<PaycheckViewerComponent>;
  let component: PaycheckViewerComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ PaycheckViewerComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(ActivatedRoute).snapshot.data['paycheck'] = createSpyObj('Paycheck', {}, {
      grossIncome: 1500,
      taxes: [ { code: 'TAX', value: 200 } ],
      credits: [ { code: 'CREDIT', value: 100 } ],
      netIncome: 1200
    });
    fixture = TestBed.createComponent(PaycheckViewerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the title', () => {
    expect(element.querySelector('.title').textContent).toContain('PAYCHECK');
  });

  it('should display the gross income', () => {
    const column = element.querySelectorAll('.columns')[1];
    expect(column.querySelectorAll('p')[0].textContent).toContain('GROSS_INCOME');
    expect(column.querySelectorAll('p')[1].textContent).toContain('GROSS_INCOME_HELP');
    expect(column.querySelectorAll('p')[2].textContent).toContain('1,500.00');
  });

  it('should display the taxes', () => {
    const column = element.querySelectorAll('.columns')[2];
    expect(column.querySelectorAll('p')[0].textContent).toContain('TAX');
    expect(column.querySelectorAll('p')[1].textContent).toContain('TAX_HELP');
    expect(column.querySelectorAll('p')[2].textContent).toContain('- 200.00');
  });

  it('should display the credits', () => {
    const column = element.querySelectorAll('.columns')[3];
    expect(column.querySelectorAll('p')[0].textContent).toContain('CREDIT');
    expect(column.querySelectorAll('p')[1].textContent).toContain('CREDIT_HELP');
    expect(column.querySelectorAll('p')[2].textContent).toContain('+ 100.00');
  });

  it('should display the horizontal rule', () => {
    const column = element.querySelectorAll('.columns')[4];
    expect(column.querySelector('hr')).toBeDefined();
  });

  it('should display the net income', () => {
    const column = element.querySelectorAll('.columns')[5];
    expect(column.querySelectorAll('p')[0].textContent).toContain('NET_INCOME');
    expect(column.querySelectorAll('p')[1].textContent).toContain('NET_INCOME_HELP');
    expect(column.querySelectorAll('p')[2].textContent).toContain('1,200.00');
  });

  it('should display the back button', () => {
    expect(element.querySelector('button').textContent).toContain('BACK');
  });

  describe('when the back button has been clicked', () => {

    let router;

    beforeEach(() => {
      router = spyOn(TestBed.inject(Router), 'navigate');
      element.querySelector('button').click();
      fixture.detectChanges();
    });

    it('should trigger the navigation', () => {
      expect(router).toHaveBeenCalledTimes(1);
    });

  });

});
