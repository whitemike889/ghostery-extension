import React from 'react';
import renderer from 'react-test-renderer';
import About from '../About';


// Importing Mock Data
jest.mock('../../../../src/classes/Globals', () => ({
	BROWSER_INFO: { displayName: 'Chrome' },
	EXTENSION_VERSION: '8.3.2'
}));

describe('app/panel/components/About', () => {
	describe('Snapshot tests with react-test-renderer', () => {
		test('About component is rendered correctly', () => {
			const component = renderer.create(
				<About />
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});

