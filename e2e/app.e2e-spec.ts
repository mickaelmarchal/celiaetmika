import { CeliaetmikaPage } from './app.po';

describe('celiaetmika App', () => {
  let page: CeliaetmikaPage;

  beforeEach(() => {
    page = new CeliaetmikaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
