import React from 'react';
import renderer from 'react-test-renderer';

import HeaderMenu from '../HeaderMenu';

describe('app/panel/components/HeaderMenu', () => {
	describe('Snapshot tests with react-test-renderer', () => {
		test('HeaderMenu is rendering correctly', () => {
			const component = renderer.create(
				<HeaderMenu
					toggleDropDown={() => {}}
					clickBrokenPage={() => {}}
					clickSubmitTracker={() => {}}
					clickHelp={() => {}}
					clickAbout={() => {}}
					clickSubscriber={() => {}}
				/>
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});
