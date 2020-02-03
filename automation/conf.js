// solves `SyntaxError: Unexpected token import`
require("babel-register")({
    presets: [ 'es2015' ]
});

function encode(file) {
    var stream = require('fs').readFileSync(file);
    return new Buffer(stream).toString('base64');
}

exports.config = {
    /**
     *  Uncomment ONE of the following to connect to: seleniumServerJar OR directConnect. Protractor
     *  will auto-start selenium if you uncomment the jar, or connect directly to chrome/firefox
     *  if you uncomment directConnect.
     */
    //seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar",
    directConnect: true,
    restartBrowserBetweenTests: false,
    specs: ['specs/aboutSpec.js'],
    baseUrl: 'https://www.google.com',
    framework: 'jasmine',

    onPrepare: () => {
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
	            displayStacktrace: true,      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
	            displaySuccessesSummary: true, // display summary of all successes after execution
	            displayFailuresSummary: true,   // display summary of all failures after execution
	            displayPendingSummary: true,    // display summary of all pending specs after execution
	            displaySuccessfulSpec: true,    // display each successful spec
	            displayFailedSpec: true,        // display each failed spec
	            displayPendingSpec: false,      // display each pending spec
	            displaySpecDuration: false,     // display each spec duration
	            displaySuiteNumber: false,      // display each suite number (hierarchical)
	            colors: {
	                success: 'green',
	                failure: 'red',
	                pending: 'yellow'
	            },
	            prefixes: {
	                success: '✓ ',
	                failure: '✗ ',
	                pending: '* '
	            },
	            customProcessors: []
            }
        }));
    },

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            'extensions': [encode('/Users/anri/Desktop/ghostery-chrome-v8.4.4.7495514.crx')],
            prefs: {
                // disable chrome's annoying password manager
                'profile.password_manager_enabled': false,
                'credentials_enable_service': false,
                'password_manager_enabled': false
            }
        }
    },

    jasmineNodeOpts: {
        showColors: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: () => {},
        defaultTimeoutInterval: 50000
    },
    // setting-up testing for non-angular applications
    ignoreSynchronization: true
};

