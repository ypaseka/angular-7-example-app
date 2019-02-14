import {browser, by, element, ElementFinder} from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeElement(): ElementFinder {
    return element(by.tagName('xxx-home'));
  }
}
