import {HomePage} from './home.page';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should xxx-home element exist', () => {
    page.navigateTo();
    expect(page.getHomeElement).toBeDefined();
  });
});
