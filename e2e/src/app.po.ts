import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {

  navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getHeader(): ElementFinder {
    return element(by.css('.navbar'));
  }

  getBody(): ElementFinder {
    return element(by.css('.hero'));
  }

  getFooter(): ElementFinder {
    return element(by.css('.footer'));
  }

  getButton(): ElementFinder {
    return element(by.css('.button'));
  }

}
