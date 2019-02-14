import {browser, by, element, ElementFinder} from 'protractor';

export class PageNotFoundPage {
  navigateTo() {
    return browser.get('badurl');
  }

  getXxxPageNotFoundElement(): ElementFinder {
    return element(by.tagName('xxx-page-not-found'));
  }
}
