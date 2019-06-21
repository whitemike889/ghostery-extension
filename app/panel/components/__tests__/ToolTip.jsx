import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Tooltip from '../Tooltip';

describe('app/panel/components/ToolTip', () => {
	describe('Snapshot tests with react-test-renderer', () => {
		test.skip('ToolTip is rendering correctly', () => {
			const component = renderer.create(
				<Tooltip  delayHover = {() => {}} enter = {() => {}}
					leave = {() => {}}
				/>
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});
