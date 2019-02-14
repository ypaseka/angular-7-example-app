import {browser, by, element} from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getXxxHomeElement() {
    return element(by.css('xxx-home'));
  }
}
