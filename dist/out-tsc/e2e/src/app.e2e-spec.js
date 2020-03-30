import { AppPage } from './app.po';
describe('test-ng8 App', () => {
    let page;
    beforeEach(() => {
        page = new AppPage();
    });
    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('RTC');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map