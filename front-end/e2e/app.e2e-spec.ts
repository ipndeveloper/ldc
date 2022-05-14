import { AppPage } from './app.po';

describe('ldc-yard App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display root element inside the body', () => {
    page.navigateTo();
    expect(page.getRootElement()).toEqual('yrd-root');
  });
});
