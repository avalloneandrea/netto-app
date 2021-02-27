import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the header', () => {
    const element = compiled.querySelector('img');
    expect(element.src).toContain('logo');
    expect(element.alt).toContain('Netto');
  });

  it('should display the footer', () => {
    const element = compiled.querySelector('footer');
    expect(element.textContent).toContain('Netto');
    expect(element.textContent).toContain('Andrea Avallone');
    expect(element.textContent).toContain('MIT License');
  });

});
