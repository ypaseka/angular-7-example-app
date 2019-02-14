import {HomePage} from './home.page';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should be page element exists', () => {
    expect(page.pageElement).toBeDefined();
  });

  it('should be search elements exists', () => {
    expect(page.searchInputElement).toBeDefined();
    expect(page.searchButtonElement).toBeDefined();
  });
});
