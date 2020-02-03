// page is non-angular
// browser.ignoreSynchronization = true;
import BasePage from './basePage';

class RegressionPage extends BasePage {
	constructor(){
		super();
	}

	openExtension() {
		const activeUrl = 'https://www.google.com/';
		browser.get(activeUrl);
		const goToCurrWindow = BasePage.prototype.closeNewWindow();
		return goToCurrWindow;
	}

}

export default new RegressionPage();
