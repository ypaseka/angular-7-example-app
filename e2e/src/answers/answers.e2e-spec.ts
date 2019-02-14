import {AnswersPage} from './answers.po';

describe('answers page', () => {
  let page: AnswersPage;

  beforeEach(() => {
    page = new AnswersPage();
  });

  it('should xxx-stack-exchange-answers element exist', () => {
    page.navigateTo();
    expect(page.getXxxStackExchangeAnswersElement).toBeDefined();
  });
});
