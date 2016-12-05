import { HttpWrapperPage } from './app.po';

describe('http-wrapper App', function() {
  let page: HttpWrapperPage;

  beforeEach(() => {
    page = new HttpWrapperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
