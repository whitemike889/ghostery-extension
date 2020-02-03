export default class BasePage {
	constructor(){
        /**
         * wrap this.timeout (ms)
         */
		this.timeout = {
            'xs': 420,
            's' : 1000,
            'm' : 2000,
            'l' : 5000,
            'xl': 9000,
            'xxl': 15000
		}

		this.width = 580;
		this.height = 650;
	};

	/**
	* method for setting Extension dimensions in the tab
	*/

	setExtensionSize(width, height) {
		return browser.manage().window().setSize(this.width, this.height);
	}

	/**
	* method for clicking on element with wait
	*/

	clickOnElement(element) {
		element.isDisplayed().then(function(result) {
		    if (result) {
		        element.click();
		        browser.sleep(this.timeout.m);
		    } else {
		        return;
		    }
		});
	}

	/**
	* waiting for an Element to be present in the DOM
	*/

	waitForEl(element) {
		const EC = protractor.ExpectedConditions;
		browser.wait(EC.presenceOf(element), this.timeout.m).then(function(){
		    return;
		});
	}

	/**
	* method for switching to previous window
	*/

	async closeNewWindow() {
		await browser.getAllWindowHandles().then(handles => {
			browser.close();
			browser.switchTo().window(handles[handles.length-1]);
		});
	}

	/**
     * wait and verify that a page is loaded
     * @returns {promise}
     * @requires a page to include `pageLoaded` method
    */

	async loaded() {
    	return browser.wait(async () => {
    		return await this.pageLoaded();
    	}, this.timeout.l, 'timeout: waiting for page to load').catch((e) => {console.error(e.message)})
    }

    /**
     * method for opening the extension panel
    */

    openExtension() {
		const activeUrl = 'https://www.google.com/';
		browser.get(activeUrl);
		const goToCurrWindow = BasePage.prototype.closeNewWindow();
		return goToCurrWindow;
	}

    /**
     * method for dismissing promo panel -> i.e. by choosing basic plan
    */

	promoPanelSelection(){
    	const promoPanel = $$('div.PlusPromoModal__content');
		const until = protractor.ExpectedConditions;
		browser.wait(until.presenceOf(promoPanel), this.timeout.m, 'Element taking too long to appear in the DOM');

		browser.sleep(this.timeout.m);
		const promoModalBasic = $$('div.PlusPromoModal__button.basic');
		return promoModalBasic.click();
    }

    /**
     * method for switching to previous Tab
    */

    goBackToPreviousTab() {
		browser.getAllWindowHandles().then(function (handles) {
	        browser.driver.switchTo().window(handles[1]);
    		browser.driver.close();
    		browser.driver.switchTo().window(handles[0]);
    	});
    }

}
