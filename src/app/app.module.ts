import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PaycheckComponent } from './it/paycheck.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, deps: [HttpClient], useFactory: (createTranslateLoader) }
    })
  ],
  declarations: [
    AppComponent,
    PaycheckComponent
  ],
  providers: [
    { provide: LOCALE_ID, deps: [TranslateService], useFactory: createLocaleId }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function createLocaleId(translateService: TranslateService) {
  registerLocaleData(localeEn);
  registerLocaleData(localeIt);
  const defaultLang = 'en';
  const supportedLangs = [defaultLang, 'it'];
  const browserLang = translateService.getBrowserLang();
  const langToUse = supportedLangs.includes(browserLang) ? browserLang : defaultLang;
  translateService.use(langToUse);
  return langToUse;
}
