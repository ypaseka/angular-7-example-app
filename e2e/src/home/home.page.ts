import {browser, by, element, ElementFinder} from 'protractor';

export class HomePage {
  firstTextElement: ElementFinder;

  constructor() {
    this.firstTextElement = element.all(by.tagName('p')).first();
  }

  navigateTo() {
    return browser.get('/');
  }
}
