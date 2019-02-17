import {QuestionsPage} from './questions.page';

describe('questions page', () => {
  let page: QuestionsPage;

  beforeEach(() => {
    page = new QuestionsPage();
    page.navigateTo();
  });

  it('should be page element exists', () => {
    expect(page.pageElement).toBeDefined();
  });
});
