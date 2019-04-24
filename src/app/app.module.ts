import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PaycheckComponent } from './it/paycheck.component';

@NgModule({
  declarations: [
    AppComponent,
    PaycheckComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localeIt);
  }

}
