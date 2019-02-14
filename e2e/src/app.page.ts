import {by, element, ElementFinder} from 'protractor';

// The app is the spa root element, not really a page, but we use a logical page here to begin the e2e tests.
export class AppPage {
  getAppElement(): ElementFinder {
    return element(by.tagName('xxx-app'));
  }

  getHeaderElement(): ElementFinder {
    return element(by.tagName('xxx-header'));
  }
}
