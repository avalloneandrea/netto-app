import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeDefined();
  });

  it('should display the header', () => {
    const header = element.querySelector('img');
    expect(header.src).toContain('logo');
    expect(header.alt).toContain('Netto');
  });

  it('should display the footer', () => {
    const footer = element.querySelector('footer');
    expect(footer.textContent).toContain('Netto');
    expect(footer.textContent).toContain('Andrea Avallone');
    expect(footer.textContent).toContain('MIT License');
  });

});
