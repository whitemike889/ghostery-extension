import aboutPage from '../pages/aboutPage';

describe('About Test Suite', () => {
	const panelUrl = 'chrome-extension://agbomdmjjfglgplpnkahbcmblehajkag/app/templates/panel.html';

	beforeAll(async () => {
		browser.waitForAngularEnabled(false);

		await aboutPage.openExtension();
		await aboutPage.promoPanelSelection();

		const site = browser.get('https://www.google.com/');
		browser.get(panelUrl);
		const resizeExtension = aboutPage.setExtensionSize();
		const openAboutMenu = aboutPage.openAboutView();
	});

	it('should display the Ghostery Extension Version', () => {
		const ghosteryVersionTitle = $$('div.support-section h3');
		const ghosteryVersionText = 'Ghostery for Chrome version 8.4.4.7495514';

		expect(ghosteryVersionTitle.getText()).toContain(ghosteryVersionText);
	});

	it('should display the release notes text and it contains the href link', () => {
		const releaseNotesTitle = $$('div.support-section a').get(0);
		const releaseNotesText = 'See release notes for all updates';

		expect(releaseNotesTitle.getText()).toContain(releaseNotesText);
		expect(releaseNotesTitle.getAttribute('href')).toEqual('https://github.com/ghostery/ghostery-extension/releases');
	});

	it('should display the Mozilla Public License Agreement and it contains the href link', () => {
		const publicLicenseTitle = $$('div.support-section a').get(1);
		const publicLicenseText = 'Mozilla Public License Agreement';

		expect(publicLicenseTitle.getText()).toContain(publicLicenseText);
		expect(publicLicenseTitle.getAttribute('href')).toEqual('https://www.mozilla.org/en-US/MPL/2.0/');
	});

	it('should display the Privacy Statement and it contains the href link', () => {
		const privacyStatementTitle = $$('div.support-section a').get(2);
		const privacyStatementText = 'Privacy Statement';

		expect(privacyStatementTitle.getText()).toContain(privacyStatementText);
		expect(privacyStatementTitle.getAttribute('href')).toEqual('https://www.ghostery.com/about-ghostery/browser-extension-privacy-policy/');
	});

	it('should display the Terms & Conditions and it contains the href link', () => {
		const termsAndConditionsTitle = $$('div.support-section a').get(3);
		const termsAndConditionsText = 'Terms & Conditions';

		expect(termsAndConditionsTitle.getText()).toContain(termsAndConditionsText);
		expect(termsAndConditionsTitle.getAttribute('href')).toEqual('https://www.ghostery.com/about-ghostery/ghostery-terms-and-conditions/');
	});

	it('should display the Imprint and it contains the href link', () => {
		const imprintTitle = $$('div.support-section a').get(4);
		const imprintText = 'Imprint';

		expect(imprintTitle.getText()).toContain(imprintText);
		expect(imprintTitle.getAttribute('href')).toEqual('https://www.ghostery.com/about-ghostery/imprint/');
	});

	it('should display the Software Licenses title and it contains the href link', () => {
		const softwareLicenseTitle = $$('div.support-section a').get(5);
		const softwareLicenseText = 'Software Licenses';

		expect(softwareLicenseTitle.getText()).toContain(softwareLicenseText);
		expect(softwareLicenseTitle.getAttribute('href')).toEqual('chrome-extension://agbomdmjjfglgplpnkahbcmblehajkag/app/templates/licenses.html');
	});

	it('should display the Ghostery.com site and contain the href link', () => {
		const ghosterySiteTitle = $$('div.support-section a').get(6);
		const ghosterySiteText = 'Ghostery.com';

		expect(ghosterySiteTitle.getText()).toContain(ghosterySiteText);
		expect(ghosterySiteTitle.getAttribute('href')).toEqual('https://www.ghostery.com/');
	});

});
