import {browser, by, element, ElementFinder} from 'protractor';

export class PageNotFoundPage {
  navigateTo() {
    return browser.get('badurl');
  }

  getPageNotFoundElement(): ElementFinder {
    return element(by.tagName('xxx-page-not-found'));
  }
}
