import {AppPage} from './app.po';

describe('app root', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should xxx-app element exist', () => {
    expect(page.getXxxAppElement).toBeDefined();
  });

  it('should xxx-header element exist', () => {
    expect(page.getXxxHeaderElement).toBeDefined();
  });
});
