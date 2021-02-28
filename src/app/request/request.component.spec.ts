import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RequestComponent } from './request.component';

describe('RequestComponent', () => {

  let fixture: ComponentFixture<RequestComponent>;
  let component: RequestComponent;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ RequestComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the gross income element', () => {
    const element = compiled.querySelectorAll('.field')[0];
    expect(element.querySelector('label').textContent).toContain('GROSS_INCOME');
    expect(element.querySelector('input').value).toEqual('');
    expect(element.querySelector('input').placeholder).toContain('0');
  });

  it('should display the num of salaries element', () => {
    const element = compiled.querySelectorAll('.field')[1];
    expect(element.querySelector('label').textContent).toContain('NUM_OF_SALARIES');
    expect(element.querySelector('select').value).toEqual('1');
  });

  it('should display the net bonus element', () => {
    const element = compiled.querySelectorAll('.field')[2];
    expect(element.querySelector('label').textContent).toContain('NET_BONUS');
    expect(element.querySelector('input').value).toEqual('');
    expect(element.querySelector('input').placeholder).toContain('0');
  });

  it('should display the submit button', () => {
    expect(compiled.querySelector('button').textContent).toContain('SUBMIT');
  });

  describe('when the submit button has been clicked', () => {

    let navigateMethod;

    beforeEach(() => {
      navigateMethod = spyOn(TestBed.inject(Router), 'navigate');
      compiled.querySelector('button').click();
      fixture.detectChanges();
    });

    it('should disable the form', () => {
      expect(component.form.disabled).toBeTruthy();
    });

    it('should trigger the navigation', () => {
      expect(navigateMethod).toHaveBeenCalled();
    });

  });

});
