import {browser, by, element, ElementFinder} from 'protractor';

// The app is the spa root element, not really a page, but we use it as a logical page.
// The app page includes the header which contains the search box, and is the container of all other pages.
export class AppPage {
  searchButtonElement: ElementFinder;
  searchInputElement: ElementFinder;

  constructor() {
    this.searchButtonElement = element(by.css('.xxx-search-box-button'));
    this.searchInputElement = element(by.css('.xxx-search-box-input'));
  }

  navigateTo() {
    return browser.get('/');
  }
}
