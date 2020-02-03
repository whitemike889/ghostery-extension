# Ghostery Extension Automation 

#### Install Prerequisites
 - **https://yarnpkg.com/en/docs/install**
 - **https://nodejs.org/en/download/**

#### Clean Install Steps Windows/Mac 
```sh
$ Install Node package
$ Install Yarn
$ Clone Automation Repo
$ Note: make sure that the file for the extension or insights is downloaded
$ In the conf.js - please specifiy the location of the extension in your directory:
$ Windows File Example: 'C:/Users/User/Desktop/ghostery-insights-chrome-v0.5.1.2454eec.crx'
$ run: yarn - this will install the necessary packages
```

#### To Run the Tests
```sh
$ yarn test
$ If this does not run the test suite right away and it complains run:
$ yarn prepare
$ yarn update
$ Running these two commands will install and update webdriver
$ then run: yarn test
```