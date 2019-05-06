import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import About from '../About';


// Importing Mock Data
jest.mock('../../../../src/classes/Globals', () => {
	return {
		BROWSER_INFO: { displayName: 'Chrome' },
		EXTENSION_VERSION: '8.3.2'
	};
});

jest.mock('../../utils/msg', () => props => ({
	sendMessage: jest.fn(),
}));

describe('app/panel/components/About', () => {
	describe('Snapshot tests with react-test-renderer', () => {
		test('about component is rendered correctly', () => {
			const component = renderer.create(
				<About />
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});


