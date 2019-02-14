import {browser, by, element} from 'protractor';

export class QuestionsPage {
  navigateTo() {
    return browser.get('questions/x');
  }

  getXxxStackExchangeQuestionsElement() {
    return element(by.css('xxx-stack-exchange-questions'));
  }
}
