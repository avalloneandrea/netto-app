import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Paycheck } from '../domain/paycheck';
import { PaycheckComponent } from './paycheck.component';

describe('PaycheckComponent', () => {

  let fixture: ComponentFixture<PaycheckComponent>;
  let component: PaycheckComponent;
  let backend: HttpClient;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [PaycheckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycheckComponent);
    component = fixture.componentInstance;
    backend = TestBed.get(HttpClient);
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the gross income element', () => {
    const element = compiled.querySelectorAll('.field')[0];
    expect(element.querySelector('label').textContent).toContain('GROSS_INCOME');
    expect(element.querySelector('input').value).toBe('0');
  });

  it('should display the additional salaries element', () => {
    const element = compiled.querySelectorAll('.field')[1];
    expect(element.querySelector('label').textContent).toContain('ADDITIONAL_SALARIES');
    expect(element.querySelector('input').value).toBe('1');
  });

  it('should display the net bonus element', () => {
    const element = compiled.querySelectorAll('.field')[2];
    expect(element.querySelector('label').textContent).toContain('NET_BONUS');
    expect(element.querySelector('input').value).toBe('0');
  });

  it('should display the submit button', () => {
    expect(compiled.querySelector('button').textContent).toContain('SUBMIT');
  });

  it('should not display the back button', () => {
    expect(compiled.innerHTML).not.toContain('BACK');
  });

  describe('when the submit button has been clicked', () => {

    const mockPaycheck: Paycheck = {
      grossIncome: 1500,
      taxes: [{ code: 'TAX', value: 300 }],
      credits: [{ code: 'CREDIT', value: 100 }],
      netIncome: 1200
    };

    beforeEach(() => {
      spyOn(backend, 'get').and.returnValue(of(mockPaycheck));
      compiled.querySelector('button').click();
      fixture.detectChanges();
    });

    it('should display the title', () => {
      expect(compiled.querySelector('.title').textContent).toContain('PAYCHECK');
    });

    it('should display the gross income', () => {
      const element = compiled.querySelectorAll('.level')[1];
      expect(element.querySelector('.level-left').textContent).toContain('GROSS_INCOME');
      expect(element.querySelector('.level-right').textContent).toContain('1,500.00');
    });

    it('should display the tax', () => {
      const element = compiled.querySelectorAll('.level')[2];
      expect(element.querySelector('.level-left').textContent).toContain('TAX');
      expect(element.querySelector('.level-right').textContent).toContain('- 300.00');
    });

    it('should display the credit', () => {
      const element = compiled.querySelectorAll('.level')[3];
      expect(element.querySelector('.level-left').textContent).toContain('CREDIT');
      expect(element.querySelector('.level-right').textContent).toContain('+ 100.00');
    });

    it('should display the net income', () => {
      const element = compiled.querySelectorAll('.level')[5];
      expect(element.querySelector('.level-left').textContent).toContain('NET_INCOME');
      expect(element.querySelector('.level-right').textContent).toContain('1,200.00');
    });

    it('should display the back button', () => {
      expect(compiled.querySelector('button').textContent).toContain('BACK');
    });

    it('should not display the submit button', () => {
      expect(compiled.innerHTML).not.toContain('SUBMIT');
    });

    describe('when the back button has been clicked', () => {

      beforeEach(() => {
        compiled.querySelector('button').click();
        fixture.detectChanges();
      });

      it('should display the gross income element', () => {
        const element = compiled.querySelectorAll('.field')[0];
        expect(element.querySelector('label').textContent).toContain('GROSS_INCOME');
        expect(element.querySelector('input').value).toBe('0');
      });

      it('should display the additional salaries element', () => {
        const element = compiled.querySelectorAll('.field')[1];
        expect(element.querySelector('label').textContent).toContain('ADDITIONAL_SALARIES');
        expect(element.querySelector('input').value).toBe('1');
      });

      it('should display the net bonus element', () => {
        const element = compiled.querySelectorAll('.field')[2];
        expect(element.querySelector('label').textContent).toContain('NET_BONUS');
        expect(element.querySelector('input').value).toBe('0');
      });

      it('should display the submit button', () => {
        expect(compiled.querySelector('button').textContent).toContain('SUBMIT');
      });

      it('should not display the back button', () => {
        expect(compiled.innerHTML).not.toContain('BACK');
      });

    });

  });

});
