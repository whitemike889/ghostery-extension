import React from 'react';
import renderer from 'react-test-renderer';
import ClassNames from 'classnames';

import ClickOutside from '../BuildingBlocks/ClickOutside';
import HeaderMenu from '../HeaderMenu';
import { log } from '../../../src/utils/common';
import globals from '../../../../src/classes/Globals';
import { sendMessage, sendMessageInPromise } from '../utils/msg';

describe.skip('app/panel/components/HeaderMenu', () => {
	describe('Snapshot tests with react-test-renderer', () => {
		test('HeaderMenu is rendering correctly', () => {
			const component = renderer.create(
				<HeaderMenu  toggleDropDown = {() => {}} clickBrokenPage = {() => {}}
					clickSubmitTracker = {() => {}} clickHelp = {() => {}}
					clickAbout = {() => {}} clickSubscriber = {() => {}}	
				/>
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});