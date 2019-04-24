/**
 * Test file for Panel Actions
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
import * as msg from '../../utils/msg';
import * as panelActions from '../PanelActions';
import {
	TOGGLE_CLIQZ_FEATURE,
	UPDATE_PANEL_DATA,	
	SHOW_NOTIFICATION,
	CLOSE_NOTIFICATION,
	TOGGLE_EXPERT,
	SET_THEME,
	CLEAR_THEME	
} from '../../constants/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('app/panel/actions/PanelActions.js', () => {

	test('toggleCliqzFeature action should resolve correctly', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			featureName: 'enable_ad_block',
			isEnabled: true
		};
		const expectedPayload = { data, type: TOGGLE_CLIQZ_FEATURE };

		store.dispatch(panelActions.toggleCliqzFeature(data.featureName, data.isEnabled));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('updatePanelData action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		}

		const expectedPayload = { data, type: UPDATE_PANEL_DATA };
		store.dispatch(panelActions.updatePanelData(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	test('showNotification action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		}

		const expectedPayload = {data, type: SHOW_NOTIFICATION};
		store.dispatch(panelActions.showNotification(data));

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	test('closeNotification action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		}

		const expectedPayload = {data, type: CLOSE_NOTIFICATION};
		store.dispatch(panelActions.closeNotification(data));

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	test('toggleExpect action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const expectedPayload = {type: TOGGLE_EXPERT};
		store.dispatch(panelActions.toggleExpert());

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	test('getTheme action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const data = { test: 'test-theme' };
		const expectedPayload = { data, type: SET_THEME };

		msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
			switch (name) {
				case 'getTheme':
					resolve(data);
					break;
				case 'account.getTheme': 
					resolve(data);
				default:
					resolve();
			}
		}));

		return store.dispatch(panelActions.getTheme(data)).then(() => {
			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		});

	});

	// should resolve data

	// test.only('getTheme action should resolve', () => {
	// 	const initialState = {};
	// 	const store = mockStore(initialState);

	// 	const data = { test: 'test-theme' };
	// 	const expectedPayload = { data, type: SET_THEME };

	// 	msg.sendMessageInPromise = jest.fn(name => new Promise((resolve) => {
	// 		resolve();
	// 		}
	// 	}));

	// 	// maybe it is failing bc you would need to be a subscribed user in order to change the theme
	// 	return store.dispatch(panelActions.getTheme(data)).then(() => {
	// 		const actions = store.getActions();
	// 		expect(actions).toEqual([expectedPayload]);
	// 	});

	// });

});
