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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaycheckDashboardComponent } from './paycheck-dashboard/paycheck-dashboard.component';
import { PaycheckViewerComponent } from './paycheck-viewer/paycheck-viewer.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, deps: [ HttpClient ], useFactory: (createTranslateLoader) },
    }),
  ],
  declarations: [
    AppComponent,
    PaycheckDashboardComponent,
    PaycheckViewerComponent,
  ],
  providers: [
    { provide: LOCALE_ID, deps: [ TranslateService ], useFactory: createLocaleId },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}

export function createTranslateLoader(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function createLocaleId(translateService: TranslateService): string {
  registerLocaleData(localeEn);
  registerLocaleData(localeIt);
  const defaultLang = 'en';
  const supportedLangs = [ defaultLang, 'it' ];
  const browserLang = translateService.getBrowserLang();
  const langToUse = supportedLangs.includes(browserLang) ? browserLang : defaultLang;
  translateService.use(langToUse);
  return langToUse;
}
