import {AppPage} from './app.page';

describe('app root', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be page element exists', () => {
    expect(page.pageElement).toBeDefined();
  });

  it('should be header element exists', () => {
    expect(page.headerElement).toBeDefined();
  });
});
