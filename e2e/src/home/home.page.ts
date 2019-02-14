import {by, element, ElementFinder} from 'protractor';

export class HomePage {
  pageElement: ElementFinder;
  searchButtonElement: ElementFinder;
  searchInputElement: ElementFinder;

  constructor() {
    this.pageElement = element(by.tagName('xxx-home'));
    this.searchButtonElement = element(by.css('xxx-search-box-button'));
    this.searchInputElement = element(by.css('xxx-search-box-input'));
  }
}
