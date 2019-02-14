import {PageNotFoundPage} from './page-not-found.page';

describe('page not found page', () => {
  let page: PageNotFoundPage;

  beforeEach(() => {
    page = new PageNotFoundPage();
  });

  it('should xxx-page-not-found element exist', () => {
    page.navigateTo();
    expect(page.getPageNotFoundElement).toBeDefined();
  });
});
