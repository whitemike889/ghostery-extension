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
import AccountReducer from '../AccountReducer.js';
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
		expect(AccountReducer(undefined, {})).toEqual({
			loggedIn: false,
			userID: '',
			user: null,
			userSettings: null,
			subscriptionData: null
		});
	});

	test('reducer correctly handles login success', () => {
		const data = {
			loggedIn: true,
		};

		const action = { data, type: LOGIN_SUCCESS};
		const initState = Immutable.merge(initialState,{
			loggedIn: data.loggedIn
		});	

		expect(AccountReducer(initState, action)).toEqual({
			loggedIn: true,
			userID: '',
			user: null,
			userSettings: null,
			subscriptionData: null
		});
	});




});