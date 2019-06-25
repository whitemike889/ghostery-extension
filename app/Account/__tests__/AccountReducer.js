/**
 * Account View Test Reducer
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

import Immutable from 'seamless-immutable';
import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	GET_USER_SUCCESS,
	GET_USER_SETTINGS_SUCCESS,
	GET_USER_SUBSCRIPTION_DATA_FAIL,
	GET_USER_SUBSCRIPTION_DATA_SUCCESS
} from '../AccountConstants';
import AccountReducer from '../AccountReducer';
import { UPDATE_PANEL_DATA } from '../../panel/constants/constants';

// Copied from App account Default Props
const initialState = Immutable({
	loggedIn: false,
	userID: '',
	user: null,
	userSettings: null,
	subscriptionData: null
});

describe('app/account/Account reducer', () => {
	test('initial state is correct', () => {
		expect(AccountReducer(undefined, {})).toEqual(initialState);
	});

	test('reducer correctly handles UPDATE_PANEL_DATA I', () => {
		const action = {
			data: { account: null },
			type: UPDATE_PANEL_DATA
		};
		expect(AccountReducer(undefined, action)).toEqual(initialState);
	});

	test('reducer correctly handles UPDATE_PANEL_DATA II', () => {
		const account = {
			userID: 'test',
			user: { test: 'user' },
			userSettings: { test: 'user-settings' },
			subscriptionData: { test: 'subscription-data' }
		};
		const action = {
			data: { account },
			type: UPDATE_PANEL_DATA
		};

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
			...account,
		}));
	});

	test('reducer correctly handles REGISTER_SUCCESS', () => {
		const action = { type: REGISTER_SUCCESS };
		const initState = Immutable({ test: 'testing' });

		expect(AccountReducer(initState, action)).toEqual(Immutable.merge(initState, {
			loggedIn: true,
		}));
	});

	test('reducer correctly handles LOGIN_SUCCESS', () => {
		const action = { type: LOGIN_SUCCESS };

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
		}));
	});

	// With Logout we want to test whether the reducer resets the state.
	// I would start with a bogus initState and make sure that it gets reset to initialState
	test('reducer correctly handles LOGOUT_SUCCESS', () => {
		const action = { type: LOGOUT_SUCCESS };
		const initState = Immutable({ test: 'testing' });

		expect(AccountReducer(initState, action)).toEqual(initialState);
	});

	// I would put something on the user object.
	test('reducer correctly handles GET_USER_SUCCESS', () => {
		const user = { test: 'testing' };
		const action = {
			type: GET_USER_SUCCESS,
			payload: { user }
		};

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
			user
		}));
	});

	test('reducer correctly handles GET_USER_SETTINGS_SUCCESS', () => {
		const settings = { test: 'testing' };
		const action = {
			type: GET_USER_SETTINGS_SUCCESS,
			payload: { settings }
		};

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
			userSettings: settings
		}));
	});

	// With this test we want to see that only SubscriptionData gets reset.
	// I would start with a bogus initState and make sure that SubscriptionData gets reset.
	test('reducer correctly handles GET_USER_SUBSCRIPTION_DATA_FAIL', () => {
		const action = {
			type: GET_USER_SUBSCRIPTION_DATA_FAIL,
		};
		const initState = {
			test: 'testing',
			subscriptionData: { test: 'testing' },
		};

		expect(AccountReducer(initState, action)).toEqual(Immutable.merge(initState, {
			subscriptionData: initialState.subscriptionData,
		}));
	});

	test('reducer correctly handles GET_USER_SUBSCRIPTION_DATA_SUCCESS', () => {
		const subscriptionData = { test: 'test-data' };
		const action = {
			type: GET_USER_SUBSCRIPTION_DATA_SUCCESS,
			payload: { subscriptionData }
		};

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
			subscriptionData
		}));
	});
});
