import {browser, by, element} from 'protractor';

export class AnswersPage {
  navigateTo() {
    return browser.get('answers/x');
  }

  getXxxStackExchangeAnswersElement() {
    return element(by.css('xxx-stack-exchange-answers'));
  }
}
