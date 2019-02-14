import {browser, by, element} from 'protractor';

export class PageNotFoundPage {
  navigateTo() {
    return browser.get('badurl');
  }

  getXxxPageNotFoundElement() {
    return element(by.css('xxx-page-not-found'));
  }
}
