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

	test('reducer correctly handles LOGOUT_SUCCESS', () => {
		const action = { type: LOGOUT_SUCCESS };

		expect(AccountReducer(undefined, action)).toEqual(initialState);
	});

	test('reducer correctly handles GET_USER_SUCCESS', () => {
		const user = {};
		const action = {
			type: GET_USER_SUCCESS,
			payload: { user }
		};

		expect(AccountReducer(initialState, action)).toEqual(Immutable.merge(initialState, {
			loggedIn: true,
			user
		}));
	});

	test.only('reducer correctly handles GET_USER_SETTINGS_SUCCESS', () => {
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

	test('reducer correctly handles GET_USER_SUBSCRIPTION_DATA_FAIL', () => {
		const data = {
			subscriptionData: null
		};
		const action = {
			data,
			type: 'GET_USER_SUBSCRIPTION_DATA_FAIL'
		};

		const initState = Immutable.merge(initialState, {
			subscriptionData: data.subscriptionData
		});

		expect(AccountReducer(initState, {})).toEqual({
			loggedIn: false,
			userID: '',
			user: null,
			userSettings: null,
			subscriptionData: null
		});
	});

	test('reducer correctly handles GET_USER_SUBSCRIPTION_DATA_SUCCESS', () => {
		const data = {
			loggedIn: true,
			subscriptionData: 'test-data'
		};
		const action = {
			data,
			type: GET_USER_SUBSCRIPTION_DATA_SUCCESS,
			payload: data.subscriptionData
		};

		const initState = Immutable.merge(initialState, {
			loggedIn: data.loggedIn,
			subscriptionData: action.payload
		});

		expect(AccountReducer(initState, action.payload)).toEqual({
			loggedIn: true,
			userID: '',
			user: null,
			userSettings: null,
			subscriptionData: 'test-data'
		});
	});
});
