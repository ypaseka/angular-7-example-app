import {HomePage} from './home.po';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should xxx-home element exist', () => {
    page.navigateTo();
    expect(page.getXxxHomeElement).toBeDefined();
  });
});
