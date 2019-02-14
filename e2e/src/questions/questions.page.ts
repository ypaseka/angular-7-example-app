import {browser, by, element, ElementFinder} from 'protractor';

export class QuestionsPage {
  navigateTo() {
    return browser.get('questions/x');
  }

  getQuestionsElement(): ElementFinder {
    return element(by.tagName('xxx-stack-exchange-questions'));
  }
}
