import { <%= projectPageClass %> } from './app.po';

describe('<%= projectName %> App', () => {
  let page: <%= projectPageClass %>;

  beforeEach(() => {
    page = new <%= projectPageClass %> ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
