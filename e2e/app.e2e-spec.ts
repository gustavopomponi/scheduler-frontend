import { SchedulerFrontendPage } from './app.po';

describe('scheduler-frontend App', () => {
  let page: SchedulerFrontendPage;

  beforeEach(() => {
    page = new SchedulerFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
