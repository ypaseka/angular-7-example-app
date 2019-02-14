import {AppPage} from './app.page';

describe('app root', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should xxx-app element exist', () => {
    expect(page.getAppElement).toBeDefined();
  });

  it('should xxx-header element exist', () => {
    expect(page.getHeaderElement).toBeDefined();
  });
});
