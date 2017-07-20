import { DriveElectronPage } from './app.po';

describe('drive-electron App', () => {
  let page: DriveElectronPage;

  beforeEach(() => {
    page = new DriveElectronPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
