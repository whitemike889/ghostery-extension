import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Help from '../Help';

describe('app/panel/components/Subscription Help Component', () => {
	describe('Snapshot Test with react-test-render', () => {
			test('welp the help view', () => {
				const component = renderer.create(
					<Help openHubTab={() => {}} openSupportTab={() => {}}/>
				).toJSON(); 
			expect(component).toMatchSnapshot();
		});
	});
});