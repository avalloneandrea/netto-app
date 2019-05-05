import { AppPage } from './app.po';

describe('Neat App', () => {

  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display the header', () => {
    expect(page.getHeader().isPresent).toBeTruthy();
  });

  it('should display the body', () => {
    expect(page.getBody().isPresent).toBeTruthy();
  });

  it('should display the footer', () => {
    expect(page.getFooter().isPresent).toBeTruthy();
  });

  it('should display the localized submit button', () => {
    expect(page.getButton().getText()).toContain('Compute paycheck');
  });

});
