import {PageNotFoundPage} from './page-not-found.page';

describe('page not found page', () => {
  let page: PageNotFoundPage;

  beforeEach(() => {
    page = new PageNotFoundPage();
    page.navigateTo();
  });

  it('should have correct text after navigation', () => {
    expect(page.firstTextElement.getText()).toEqual('The page for this url address is not found.');
  });
});
