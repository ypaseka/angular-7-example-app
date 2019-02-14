import {QuestionsPage} from './questions.po';

describe('questions page', () => {
  let page: QuestionsPage;

  beforeEach(() => {
    page = new QuestionsPage();
  });

  it('should xxx-stack-exchange-questions element exist', () => {
    page.navigateTo();
    expect(page.getXxxStackExchangeQuestionsElement).toBeDefined();
  });
});
