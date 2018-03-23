import { <%= demoProjectPageClass %> } from './app.po';

describe('<%= projectName %>-demo App', () => {
  let page: <%= demoProjectPageClass %>;

  beforeEach(() => {
    page = new <%= demoProjectPageClass %> ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
