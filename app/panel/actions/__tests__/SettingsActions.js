/**
 * Test file for Settings Actions
 *
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2019 Ghostery, Inc. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as settingsActions from '../settingsActions';
import {
	IMPORT_SETTINGS_DIALOG,
	IMPORT_SETTINGS_NATIVE,
	IMPORT_SETTINGS_FAILED,
	EXPORT_SETTINGS,
	SELECT_ITEM,
	TOGGLE_CHECKBOX,
	UPDATE_DATABASE,
	UPDATE_NOTIFICATION_STATUS,
	UPDATE_SETTINGS_BLOCK_ALL_TRACKERS,
	UPDATE_SETTINGS_CATEGORY_BLOCKED,
	UPDATE_SETTINGS_TRACKER_BLOCKED,
	SETTINGS_TOGGLE_EXPAND_ALL,
	SETTINGS_UPDATE_SEARCH_VALUE,
	SETTINGS_SEARCH_SUBMIT,
	SETTINGS_FILTER,
	GET_SETTINGS_DATA,
	DO_NOTHING
} from '../../constants/constants';
// import { sendMessageInPromise } from '../../utils/msg';
// import bannerStatus from '../../reducers/settings';
import * as msg from '../../utils/msg';
import { hashCode } from '../../../../src/utils/common';
import globals from '../../../../src/classes/Globals';


// Importing Mock Data
// jest.mock('../../../../src/classes/Globals', () => {
// 	BROWSER_INFO: jest.fn();
// });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('app/panel/actions/SettingsActions.js', () => {

	test('updateSettingsData should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const testPortData = { test: 'test-data'};
		const promisedTestData = { test: 'test-data2'};
		let expectedPayload = {
			type: GET_SETTINGS_DATA,
			data: promisedTestData
		}

		if(testPortData){
			expectedPayload = {
				type: GET_SETTINGS_DATA,
				data: testPortData
			}

			store.dispatch(settingsActions.updateSettingsData(testPortData));

			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		}
		else {
			msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
				switch (name) {
					case 'getPanelData': {
						resolve(promisedTestData);
						break;
					}	
					default: 
						resolve();
				}
			}));

			store.dispatch(settingsActions.updateSettingsData(promisedTestData));
					const actions = store.getActions();
					expect(actions).toEqual([expectedPayload]);
		}	
	});




	test.skip('exportSettings should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data'};
		let expectedPayload = {
			data, 
			type: EXPORT_SETTINGS
		}
		const testPageUrl = 'yourdailydish.com';
		const url = testPageUrl || ''; 
		globals.BROWSER_INFO.name = jest.fn(() => 'edge');
			
		console.log( url.search('http') );

		if( url.search('http') === -1 ||
			(globals.BROWSER_INFO.name === 'edge' && url.search('www.msn.com/spartan') !== -1)){
			console.log('here 0');
			expectedPayload = {
				type: EXPORT_SETTINGS,
				data: 'RESERVED_PAGE',
			}

			return store.dispatch(settingsActions.exportSettings(data))
				.then(() => {
					const actions = store.getActions();
					expect(actions).toEqual([expectedPayload]);
			});
		}

		msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
			switch (name) {
				case 'getSettingsForExport': {
					resolve(data);
				}	
				default: 
					resolve();
			}
		}));

		return store.dispatch(settingsActions.exportSettings(data))
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual([expectedPayload]);
		});
	});



	test('selectItem should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: SELECT_ITEM
		}

		store.dispatch(settingsActions.selectItem(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleCheckbox should resolve', () => {
		let type;
		const initialState = {};
		const store = mockStore(initialState);
		let data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: TOGGLE_CHECKBOX
		};
	
		store.dispatch(settingsActions.toggleCheckbox(data));

		const actions = store.getActions();	
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleCheckbox should resolve with type trackers_banner_status', () => {
		let type;
		const initialState = {};
		const store = mockStore(initialState);
		let data = {
			test: 'test-data',
			event: 'trackers_banner_status'
		}

		if(data.event === 'trackers_banner_status'){
			type = UPDATE_NOTIFICATION_STATUS;
		}

		const expectedPayload = {
			data, 
			type: UPDATE_NOTIFICATION_STATUS
		}

		store.dispatch(settingsActions.toggleCheckbox(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleCheckbox should resolve with type reload_banner_status', () => {
		let type;
		const initialState = {};
		const store = mockStore(initialState);
		let data = {
			test: 'test-data',
			event: 'reload_banner_status'
		}

		if(data.event === 'reload_banner_status'){
			type = UPDATE_NOTIFICATION_STATUS;
		}

		const expectedPayload = {
			data, 
			type: UPDATE_NOTIFICATION_STATUS
		}

		store.dispatch(settingsActions.toggleCheckbox(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updateDatabase should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		let resultText;
		const expectedPayload = {
			resultText,
			type: UPDATE_DATABASE
		}	

		const testResult = { 
			success: true,
			updated: true
		};
		msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
			switch (name) {
				case 'update_database': {
					if( testResult.success === true ){
						if( testResult.updated === true ){
							expectedPayload.resultText = 'settings_update_success';
							resolve(testResult);
							break;	
						}
					}
					else {
						expectedPayload.resultText = 'settings_update_up_to_date';
						resolve(testResult);
						break;
					}
				}	
				default: 
					expectedPayload.resultText = 'settings_update_failed';
					resolve();
			}
		}));

		return store.dispatch(settingsActions.updateDatabase())
			.then(() => {
				const actions = store.getActions();
				expect(actions).toEqual([expectedPayload]);
		});
	});

	test('updateBlockAllTrackers should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: UPDATE_SETTINGS_BLOCK_ALL_TRACKERS
		}

		store.dispatch(settingsActions.updateBlockAllTrackers(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updateCategoryBlocked should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: UPDATE_SETTINGS_CATEGORY_BLOCKED
		}

		store.dispatch(settingsActions.updateCategoryBlocked(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updateTrackerBlocked should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data,
			type: UPDATE_SETTINGS_TRACKER_BLOCKED
		}

		store.dispatch(settingsActions.updateTrackerBlocked(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('showNotification should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: 'DO_NOTHING'
		};

		store.dispatch(settingsActions.showNotification(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleExpandAll should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data, 
			type: SETTINGS_TOGGLE_EXPAND_ALL
		}

		store.dispatch(settingsActions.toggleExpandAll(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updateSearchValue should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {test: 'test-data'};
		const expectedPayload = {
			data, 
			type: SETTINGS_UPDATE_SEARCH_VALUE
		};

		store.dispatch(settingsActions.updateSearchValue(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('handleSearchSubmit should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {test: 'test-data'};
		const expectedPayload = {
			data, 
			type: SETTINGS_SEARCH_SUBMIT
		};

		store.dispatch(settingsActions.handleSearchSubmit(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('filter should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {test: 'test-data'};
		const expectedPayload = {
			data,
			type: SETTINGS_FILTER
		};

		store.dispatch(settingsActions.filter(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

});