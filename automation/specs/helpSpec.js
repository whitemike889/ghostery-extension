import helpPage from '../pages/helpPage';

describe('Help View Test Suite', () => {
	const panelUrl = 'chrome-extension://agbomdmjjfglgplpnkahbcmblehajkag/app/templates/panel.html';
	const timeouts = {
		's': 2000,
		'm': 4000,
		'l': 8000
	};

	beforeAll(async () => {
		browser.waitForAngularEnabled(false);

		await helpPage.openExtension();
		await helpPage.promoPanelSelection();

		const site = browser.get('https://www.google.com/');
		browser.get(panelUrl);
		const resizeExtension = helpPage.setExtensionSize();
		const openHelpMenu = helpPage.openHelpView();
	});

	it('should open the Hub from the Help View', () => {
		const setUpGhosteryTitle = $$('div.support-section').get(0);
		setUpGhosteryTitle.click();
		browser.sleep(timeouts.s);

		expect(browser.getCurrentUrl()).toBe(panelUrl);
		helpPage.goBackToPreviousTab();
	});

	it('should have the title for Comments and Quesions menu', () => {
		const commentsMenuTitle = $$('div.support-section h3');
		const commentsMenuText = 'Questions and Comments';

		expect(commentsMenuTitle.getText()).toContain(commentsMenuText);
	});

	it('should contain the Frequently Asked Questions title and url', () => {
		const faqsTitle = $$('div.support-section:nth-child(3) a:nth-child(2)');
		const faqsText = 'Frequently Asked Questions';

		expect(faqsTitle.getText()).toContain(faqsText);
		expect(faqsTitle.getAttribute('href')).toContain('https://www.ghostery.com/faqs/');
	});

	it('should contain the Survey text and url', () => {
		const surveyTitle = $$('div.support-section:nth-child(3) a:nth-child(3)');
		const surveyText= 'Take Our Survey';

		expect(surveyTitle.getText()).toContain(surveyText);
		expect(surveyTitle.getAttribute('href')).toContain('https://www.ghostery.com/survey/in-app');
	});

	it('should contain the Support title', () => {
		const supportTitle = $$('div.support-section:nth-child(3) a:nth-child(4)');
		const supportText = 'Support';

		expect(supportTitle.getText()).toContain(supportText);
	});

	// need to investigate this one...closes out the browser
	xit('should take you to the Support Contact URL', () => {
		const supportTitle = $$('div.support-section:nth-child(3) a:nth-child(4)');
		const supportUrl = 'https://www.ghostery.com/support/';

		supportTitle.click();
		browser.sleep(8000);
		expect(browser.getCurrentUrl()).toBe(supportUrl);
		browser.sleep(2000);
	});

	it('should contain the Contact Us text', () => {
		const contactUsTitle = $$('div.support-section h3').get(1);
		const contactUsText = 'How to Contact Us';

		expect(contactUsTitle.getText()).toContain(contactUsText);
	})

	it('should contain the Contact Us Email href', () => {
		const contactUsEmailLink = $$('div.support-section a.info');

		expect(contactUsEmailLink.getAttribute('href')).toContain('mailto:info@ghostery.com');
	});

});
