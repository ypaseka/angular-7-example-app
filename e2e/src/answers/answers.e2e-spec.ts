import {AnswersPage} from './answers.page';

describe('answers page', () => {
  let page: AnswersPage;

  beforeEach(() => {
    page = new AnswersPage();
  });

  it('should be page element exists', () => {
    expect(page.pageElement).toBeDefined();
  });
});
