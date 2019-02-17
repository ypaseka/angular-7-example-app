import {browser, by, element, ElementFinder} from 'protractor';

export class AnswersPage {
  pageElement: ElementFinder;

  constructor() {
    this.navigateTo();
    this.pageElement = element(by.tagName('xxx-stack-exchange-answers'));
  }

  navigateTo() {
    return browser.get('answers/x');
  }
}
