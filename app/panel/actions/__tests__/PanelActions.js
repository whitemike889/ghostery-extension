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

const initStoreHelper = (initialState) => {
	const store = mockStore(initialState);
	return store;
};

const expectedDataHelper = (data, TYPE) => {
	const expectedPayload = { data, type: TYPE };
	return expectedPayload;
};

describe('app/panel/actions/PanelActions.js', () => {
	test('toggleCliqzFeature action should resolve correctly', () => {
		const store = initStoreHelper({});
		const expected = expectedDataHelper({ featureName: 'enable_ad_block', isEnabled: true }, TOGGLE_CLIQZ_FEATURE);

		store.dispatch(panelActions.toggleCliqzFeature(expected.data.featureName, expected.data.isEnabled));

		const actions = store.getActions();
		expect(actions).toEqual([expected]);
	});

	xtest('updatePanelData action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		};

		const expectedPayload = { data, type: UPDATE_PANEL_DATA };
		store.dispatch(panelActions.updatePanelData(data));

		const actions = store.getActions();
		expect(actions).toEqual([expectedPayload]);
	});

	xtest('showNotification action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		};

		const expectedPayload = { data, type: SHOW_NOTIFICATION };
		store.dispatch(panelActions.showNotification(data));

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	xtest('closeNotification action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);
		const data = {
			test: 'test-data'
		};

		const expectedPayload = { data, type: CLOSE_NOTIFICATION };
		store.dispatch(panelActions.closeNotification(data));

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	xtest('toggleExpect action should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const expectedPayload = { type: TOGGLE_EXPERT };
		store.dispatch(panelActions.toggleExpert());

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});

	xtest('getTheme action should resolve', () => {
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
					break;
				default:
					resolve();
			}
		}));

		return store.dispatch(panelActions.getTheme(data)).then(() => {
			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		});
	});

	xtest('getTheme action should resolve with no theme set', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const data = { test: 'test-theme' };
		const expectedPayload = { type: CLEAR_THEME };

		msg.sendMessageInPromise = jest.fn(() => new Promise((resolve) => {
			resolve();
		}));

		return store.dispatch(panelActions.getTheme(data)).then(() => {
			const actions = store.getActions();
			expect(actions).toEqual([expectedPayload]);
		});
	});
});
