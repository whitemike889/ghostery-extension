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
import bannerStatus from '../../reducers/settings';
import * as msg from '../../utils/msg';
import { hashCode } from '../../../../src/utils/common';
import globals from '../../../../src/classes/Globals';

import * as settingsActions from '../settingsActions';
import fs from 'fs';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('fs', () => ({
	readFileSync: jest.fn()
}));

describe('app/panel/actions/SettingsActions.js', () => {
	test.skip('Should return the parsed JSON from a file specified as param', (done) => {
		const initialState = {};
		const store = mockStore(initialState);

		console.log(1);
		const fileReader = new FileReader();
		console.log(fileReader.readyState);
		fs.readFileSync.mockReturnValue('{ "test": 1 }');


		console.log(2);
		// this is coming in as undefined

		const parseJSON = settingsActions.importSettingsNative('test.json');
		// console.log( settingsActions.importSettingsNative('test.json') );
		const result = fileReader.parseJSON;
		// console.log( parseJSON() );
		// console.log( result );
		expect(result).toEqual({ test: 1 });
		done();
	});


	test('updateSettingsData should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const testPortData = { test: 'test-data' };
		const promisedTestData = { test: 'test-data2' };
		let expectedPayload = {
			type: GET_SETTINGS_DATA,
			data: promisedTestData
		};

		if (testPortData) {
			expectedPayload = {
				type: GET_SETTINGS_DATA,
				data: testPortData
			};

			store.dispatch(settingsActions.updateSettingsData(testPortData));

			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		} else {
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

	test('importSettingsDialog', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			type: IMPORT_SETTINGS_DIALOG,
			data
		};
		const url = 'test';
		if (url.search('http') === -1) {
			expectedPayload.data = 'false';

			store.dispatch(settingsActions.importSettingsDialog());

			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		} else {
			msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
				switch (name) {
					case 'showBrowseWindow': {
						resolve(data);
					}
					default:
						resolve();
				}
			}));

			return store.dispatch(settingsActions.importSettingsDialog(data))
				.then(() => {
					const actions = store.getActions();
					expect(actions).toEqual([expectedPayload]);
				});
		}
	});


	test.skip('importSettingsNative should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const settings = { test: 'test-file' };
		const expectedPayload = {
		 	type: IMPORT_SETTINGS_NATIVE,
		 	settings
		 };
		const testFileToLoad = {
			hash: -2040900451,
			settings: {
				conf: {
					alert_bubble_pos: 'br',
					alert_bubble_timeout: 15,
					alert_expanded: false,
					block_by_default: false,
					enable_ad_block: true,
					enable_anti_tracking: true,
					enable_autoupdate: true,
					enable_click2play: true,
					enable_click2play_social: true,
					enable_human_web: true,
					enable_metrics: false,
					enable_offers: true,
					enable_smart_block: true,
					expand_all_trackers: false,
					hide_alert_trusted: false,
					ignore_first_party: true,
					import_callout_dismissed: true,
					is_expanded: false,
					is_expert: false,
					notify_library_updates: false,
					notify_upgrade_updates: true,
					reload_banner_status: { dismissals: [], show_time: 1559165704372, show: true },
					selected_app_ids: {
						41: 1, 868: 1, 1291: 1, 2337: 1, 2383: 1
					},
					show_alert: true,
					show_badge: true,
					show_cmp: true,
					show_tracker_urls: true,
					site_specific_blocks: {},
					site_specific_unblocks: {},
					toggle_individual_trackers: true,
					trackers_banner_status: { dismissals: [], show_time: 1559165704372, show: true },
					current_theme: 'default',
					site_blacklist: [],
					site_whitelist: ['mediasetplay.mediaset.it']
				}
			}
		};
		const fileReader = new FileReader();
		const onLoadMock = { onload: jest.fn() };


		console.log('here 0');
		// need to mock onload
		fileReader.onLoadMock = (testFileLoadedEvent) => {
			console.log('load event is firing');
			try {
				console.log('here 1');
				const backup = {
					hash: -2040900451
				};
				if (backup.hash !== testFileToLoad.hash) {
					throw new Error('Invalid Hash');
				}
				store.dispatch(settingsActions.importSettingsNative());

				const actions = store.getActions();
				expect(actions).toEqual([expectedPayload]);
			} catch (err) {
				console.log(err);
			}
		};
		console.log('here 2');
		// fileReader.readAsText(testFileToLoad, 'UTF-8');
	});


	test('exportSettings should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data,
			type: EXPORT_SETTINGS
		};
		const url = 'test';
		// mock Browser info
		globals.BROWSER_INFO.name = jest.fn(() => 'edge');

		if (url.search('http') === -1) {
			expectedPayload.data = 'RESERVED_PAGE';

			store.dispatch(settingsActions.exportSettings());

			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		} else if (globals.BROWSER_INFO.name === 'edge' && (url.search('www.msn.com/spartan') !== -1)) {
			expectedPayload.data = 'RESERVED_PAGE';

			store.dispatch(settingsActions.exportSettings());

			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		} else {
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
		}
	});


	test('selectItem should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
		const expectedPayload = {
			data,
			type: SELECT_ITEM
		};

		store.dispatch(settingsActions.selectItem(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleCheckbox should resolve', () => {
		let type;
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
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
		const data = {
			test: 'test-data',
			event: 'trackers_banner_status'
		};

		if (data.event === 'trackers_banner_status') {
			type = UPDATE_NOTIFICATION_STATUS;
		}

		const expectedPayload = {
			data,
			type: UPDATE_NOTIFICATION_STATUS
		};

		store.dispatch(settingsActions.toggleCheckbox(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('toggleCheckbox should resolve with type reload_banner_status', () => {
		let type;
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data',
			event: 'reload_banner_status'
		};

		if (data.event === 'reload_banner_status') {
			type = UPDATE_NOTIFICATION_STATUS;
		}

		const expectedPayload = {
			data,
			type: UPDATE_NOTIFICATION_STATUS
		};

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
		};

		const testResult = {
			success: true,
			updated: true
		};
		msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
			switch (name) {
				case 'update_database': {
					if (testResult.success === true) {
						if (testResult.updated === true) {
							expectedPayload.resultText = 'settings_update_success';
							resolve(testResult);
							break;
						}
					} else {
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
		};

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
		};

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
		};

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
		};

		store.dispatch(settingsActions.toggleExpandAll(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updateSearchValue should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = { test: 'test-data' };
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
		const data = { test: 'test-data' };
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
		const data = { test: 'test-data' };
		const expectedPayload = {
			data,
			type: SETTINGS_FILTER
		};

		store.dispatch(settingsActions.filter(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});
});
