import {HomePage} from './home.page';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should have correct text after navigation', () => {
    expect(page.firstTextElement.getText()).toEqual('Welcome to Stack Exchange Search.');
  });
});
