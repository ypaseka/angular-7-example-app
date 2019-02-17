import {browser} from 'protractor';
import {AppPage} from './app.page';

describe('app root', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should be able to enter search text', () => {
    page.searchInputElement.sendKeys('zz');
    expect(page.searchInputElement.getAttribute('value')).toEqual('zz');
  });

  it('should be after entering search text button click goes to questions page', () => {
    page.searchInputElement.sendKeys('zz');
    page.searchButtonElement.click();
    browser.getCurrentUrl().then((url) => {
      expect(url.indexOf('/questions?title=zz') !== -1).toBeTruthy();
    });
  });
});
