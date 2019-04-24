/**
 * Test file for Detail Actions
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
import * as detailActions from '../DetailActions';
import { TOGGLE_EXPANDED } from '../../constants/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('app/panel/actions/DetailActions.js', () => {
	test('toggleExpanded should resolve', () => {
		const initialState = {};
		const store = mockStore(initialState);

		const expectedPayload = { type: TOGGLE_EXPANDED};
		store.dispatch(detailActions.toggleExpanded());

		const action = store.getActions();
		expect(action).toEqual([expectedPayload]);
	});
});