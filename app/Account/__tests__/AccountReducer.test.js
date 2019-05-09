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

	test('reducer correctly handles UPDATE_PANEL_DATA', () => {
		let data = null;
		const account = data;
		const action = {
			data,
			type: UPDATE_PANEL_DATA
		}
		if( account === null ){
			expect(AccountReducer(undefined, {})).toEqual({
				loggedIn: false,
				userID: '',
				user: null,
				userSettings: null,
				subscriptionData: null
			});
		}
		else if ( account !== null ) {
			data = {
				loggedIn: true,
				userID: '',
				user: null,
				userSettings: null,
				subscriptionData: null	
			};
			const initState = Immutable.merge(initialState, {
				loggedIn: data.loggedIn,
				userID: data.userID,
				user: data.user,
				userSettings: data.userSettings,
				subscriptionData: data.subscriptionData		
			});

			expect(AccountReducer(initState, action)).toEqual({
				loggedIn: true,
				userID: '',
				user: null,
				userSettings: null,
				subscriptionData: null	
			});
		}	
	
	});

	test('reducer correctly handles LOGIN_SUCCESS', () => {
		const data = {
			loggedIn: true,
		};

		const action = { data, type: LOGIN_SUCCESS };
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

	test('reducer correctly handles LOGOUT_SUCCESS', () => {
		const data = {
			loggedIn: false,
		};	
		const action = { data, type: LOGOUT_SUCCESS };
		const initState = Immutable.merge(initialState, {
			loggedIn: data.loggedIn
		});

		expect(AccountReducer(initState, action)).toEqual({
			loggedIn: false,
			userID: '',
			user: null,
			userSettings: null,
			subscriptionData: null
		});

	});

	test('reducer correctly handles GET_USER_SUCCESS', () => {
		const data = {
			loggedIn: true, 
			user: 'test@example.com'
		};
		const action = { 
			data, 
			type: GET_USER_SUCCESS, 
			payload: data.user
		};

		const initState = Immutable.merge(initialState,{ 
			loggedIn: data.loggedIn,
			user: data.user
		});
	
		expect(AccountReducer(initState, action.payload)).toEqual({
			loggedIn: true,
			userID: '',
			user: 'test@example.com',
			userSettings: null,
			subscriptionData: null
		});
	});

	test('reducer correctly handles GET_USER_SETTINGS_SUCCESS', () => {
		const data = {
			loggedIn: true,
			userSettings: 'test-settings'
		};

		const action = { 
			data, 
			type: GET_USER_SETTINGS_SUCCESS, 
			payload: data.userSettings
		};

		const initState = Immutable.merge(initialState, {
			loggedIn: data.loggedIn,
			userSettings: data.userSettings
		});

		expect(AccountReducer(initState, action.payload)).toEqual({
			loggedIn: true,
			userID: '',
			user: null,
			userSettings: 'test-settings',
			subscriptionData: null
		});
	});

	test('reducer correctly handles GET_USER_SUBSCRIPTION_DATA_FAIL', () => {
		const data = {
			subscriptionData: null
		};
		const action = {
			data, 
			type: 'GET_USER_SUBSCRIPTION_DATA_FAIL'
		};

		const initState = Immutable.merge(initialState,{
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
		}

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