import {QuestionsPage} from './questions.page';

describe('questions page', () => {
  let page: QuestionsPage;

  beforeEach(() => {
    page = new QuestionsPage();
  });

  it('should xxx-stack-exchange-questions element exist', () => {
    page.navigateTo();
    expect(page.getQuestionsElement).toBeDefined();
  });
});
