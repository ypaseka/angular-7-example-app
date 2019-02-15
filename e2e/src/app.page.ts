import {by, element, ElementFinder} from 'protractor';

// The app is the spa root element, not really a page, but we use a logical page here to begin the e2e tests.
export class AppPage {
  pageElement: ElementFinder;
  headerElement: ElementFinder;

  constructor() {
    this.pageElement = element(by.tagName('xxx-home'));
    this.headerElement = element(by.tagName('xxx-header'));
  }
}