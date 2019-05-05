import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getHeader() {
    return element(by.css('.navbar'));
  }

  getBody() {
    return element(by.css('.hero'));
  }

  getFooter() {
    return element(by.css('.footer'));
  }

  getButton() {
    return element(by.css('.button'));
  }

}
