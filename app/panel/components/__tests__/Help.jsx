import React from 'react';
import renderer from 'react-test-renderer';
import Help from '../Help';

describe('app/panel/components/Subscription Help Component', () => {
	describe('Snapshot Test with react-test-render', () => {
		test('help view should render', () => {
			const component = renderer.create(
				<Help openHubTab={() => {}} openSupportTab={() => {}} />
			).toJSON();
			expect(component).toMatchSnapshot();
		});
	});
});
