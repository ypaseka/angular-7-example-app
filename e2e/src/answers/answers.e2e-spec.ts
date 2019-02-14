import {AnswersPage} from './answers.page';

describe('answers page', () => {
  let page: AnswersPage;

  beforeEach(() => {
    page = new AnswersPage();
  });

  it('should xxx-stack-exchange-answers element exist', () => {
    page.navigateTo();
    expect(page.getAnswersElement).toBeDefined();
  });
});
