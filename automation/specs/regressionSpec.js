import regressionPage from '../pages/regressionPage';

describe('Regresstion Test Suite', () => {
	const panelUrl = 'chrome-extension://agbomdmjjfglgplpnkahbcmblehajkag/app/templates/panel.html';

	beforeAll(() => {
		browser.waitForAngularEnabled(false);
		const extensionLoaded = regressionPage.openExtension();
	});

	it('should open the Hub with the ability to choose a plan', () => {
		const promoPanel = $$('div.PlusPromoModal__content');
		const until = protractor.ExpectedConditions;
		browser.wait(until.presenceOf(promoPanel), 3000, 'Element taking too long to appear in the DOM');

		browser.sleep(2000);
		const promoModalBasic = $$('div.PlusPromoModal__button.basic');
		promoModalBasic.click();

		expect(promoPanel.isPresent()).toBe(false);
	});

	it('should open the Ghostery Panel', () => {
		const site = browser.get('https://www.cnn.com/');
		const test = regressionPage.loaded(site);

		browser.get(panelUrl);
		const resizeExtension = regressionPage.setExtensionSize();

		expect(browser.getCurrentUrl()).toBe(panelUrl);
	});

	it('should display the number of trackers in the wheel - Simple View', () => {
		const totalTrackers = $('div.DonutGraph__textCount');
		regressionPage.waitForEl(totalTrackers);

		expect(totalTrackers.isPresent()).toBe(true);
	});

	it('should display tooltip when hovering over the donut', () => {
		const textCount = $$('.DonutGraph__textCount');
		regressionPage.waitForEl(textCount);

		browser.actions().mouseMove(element(by.css('.DonutGraph__textCount'))).perform();
		browser.sleep(2000);

     	expect(element(by.css('.DonutGraph__textCount')).isDisplayed()).toBe(true);
	});

	it('should display the page load time in panel', () => {
		const pageLoadValue = $$('span.SummaryPageStat__value');
		regressionPage.waitForEl(pageLoadValue);

		expect(pageLoadValue.isPresent()).toBe(true);
	});

	it('should display a numeric value for Requests Modified', () => {
		const requestModifiedValue = $$('span.SummaryPageStat__value');
		regressionPage.waitForEl(requestModifiedValue);

		expect(requestModifiedValue.isPresent()).toBe(true);
	});

	it('should be able to Trust site and reload prompt is triggered', () => {
		const trustSiteInactive = $('div.GhosteryFeatureButton--inactive:nth-child(1)');
		const trustSiteClick = regressionPage.clickOnElement(trustSiteInactive);

		const reloadPrompt = $$('div.needs-reload-link');
		const siteTrustedText = $('span.GhosteryFeatureButton__text:nth-child(1)');

		expect(reloadPrompt.isPresent()).toBe(true);
		expect(siteTrustedText.getText()).toEqual('Site Trusted');
	});

	it('should be able to Restrict site and alertCallOut is prompted', () => {
		const restrictSiteInactive = $('div.Summary__ghosteryFeatureContainer--middle div.GhosteryFeatureButton--inactive');
		const restrictSiteClick = regressionPage.clickOnElement(restrictSiteInactive);

		const siteRestrictedText = $$('span.GhosteryFeatureButton__text').get(1);
		const alertCallOut = $$('div.alert.callout');

		expect(alertCallOut.isPresent()).toBe(true);
		expect(siteRestrictedText.getText()).toEqual('Site Restricted');
	});

	it('should be able to Pause Ghostery and reloadPrompt appears', () => {
		const pauseGhostery = $$('div.Summary__pauseButtonContainer');
		const pauseClick = regressionPage.clickOnElement(pauseGhostery);

		const pauseButtonText = $('span.pause-button-text');
		const reloadPrompt = $$('div.needs-reload-link');

		expect(reloadPrompt.isPresent()).toBe(true);
		expect(pauseButtonText.getText()).toEqual('Resume Ghostery');
	});

});
