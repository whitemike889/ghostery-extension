// page is non-angular
// browser.ignoreSynchronization = true;
import BasePage from './basePage';

class HelpPage extends BasePage {
	constructor(){
		super();

		// once we get the kebab spec up and running this will need to be included there
		// and then import the page object
		this.kebabView = $$('div.header-kebab');
		this.helpView = $$('li.menu-help');
	}

    openHelpView() {
    	const kebabMenu = this.kebabView;
		kebabMenu.click();
		browser.sleep(this.timeout.m);

		const helpMenu = this.helpView;
		return helpMenu.click();
    }

}

export default new HelpPage();
