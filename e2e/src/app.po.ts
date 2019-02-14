import {by, element} from 'protractor';

// The app is the spa root element, not really a page, but we use a logical page here to begin the e2e tests.
export class AppPage {
  getXxxAppElement() {
    return element(by.css('xxx-app'));
  }

  getXxxHeaderElement() {
    return element(by.css('xxx-header'));
  }
}
