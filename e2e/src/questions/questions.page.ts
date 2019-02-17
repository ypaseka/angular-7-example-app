import {browser, by, element, ElementFinder} from 'protractor';

export class QuestionsPage {
  pageElement: ElementFinder;

  constructor() {
    this.pageElement = element(by.tagName('xxx-stack-exchange-questions'));
  }

  navigateTo() {
    return browser.get('questions?title=test-title&page=2');
  }
}
