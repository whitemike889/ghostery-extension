import BasePage from './basePage';

class AboutPage extends BasePage {
	constructor(){
		super();

		this.kebabView = $$('div.header-kebab');
		this.aboutView = $$('li.menu-about');
	}

	openAboutView() {
		const kebabMenu = this.kebabView;
		kebabMenu.click();
		browser.sleep(this.timeout.m);

		const aboutMenu = this.aboutView;
		return aboutMenu.click();
	}

}

export default new AboutPage();
