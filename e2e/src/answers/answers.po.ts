import {browser, by, element, ElementFinder} from 'protractor';

export class AnswersPage {
  navigateTo() {
    return browser.get('answers/x');
  }

  getXxxStackExchangeAnswersElement(): ElementFinder {
    return element(by.tagName('xxx-stack-exchange-answers'));
  }
}
