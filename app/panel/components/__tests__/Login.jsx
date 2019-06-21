import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';
import ClassNames from 'classnames';
import RSVP from 'rsvp';

import { validateEmail } from '../../utils/utils';
import { log } from '../../../../src/utils/common';
import Login from '../Login';

describe('app/panel/components/Login Component', () => {
	describe('Snapshot test with react-test-renderer', () => {
		test('Testing login page is rendering', () => {
			const initialState = {
				email: '',
				password: '',
				loading: false,
				emailError: false,
				passwordError: false,
			}
             
			const component = renderer.create(
				shallow(<MemoryRouter>
					<Login {...initialState} />
				</MemoryRouter>)	
			).toJSON(); 
			expect(component).toMatchSnapshot();
		});
		test('Testing login page is rendering with true values', () => {
			const initialState = {
				email: '',
				password: '',
				loading: true,
				emailError: true,
				passwordError: true,
			}

			const component = renderer.create(
				shallow(<MemoryRouter>
					<Login {...initialState} />
				</MemoryRouter>)	
			).toJSON(); 
			expect(component).toMatchSnapshot();
		});
	});
	describe('Testing the handling of data input and submitting', () => {
		test('simlutaing the input of email and password', () => {
			const initialState = {
				email: '',
				password: '',
				loading: false,
				emailError: false,
				passwordError: false,
			}

			const wrapper = shallow(<Login {...initialState} />);

			const email = 'test@example.com';
			expect(wrapper.state('email')).toEqual('');
			wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: email }});
			expect(wrapper.state('email')).toEqual(email);

			const password = 'admin';
			expect(wrapper.state('password')).toEqual('');
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: password }});
			expect(wrapper.state('password')).toEqual(password);
		});

		test('login with loading set to true', () => {
			const initialState = {
				email: '',
				password: '',
				loading: true,
				emailError: false,
				passwordError: false,
			}
			
			const wrapper = shallow(<Login {...initialState} />);

			const email = 'test@example.com';
			expect(wrapper.state('email')).toEqual('');
			wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: email }});
			expect(wrapper.state('email')).toEqual(email);

			const password = 'admin';
			expect(wrapper.state('password')).toEqual('');
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: password }});
			expect(wrapper.state('password')).toEqual(password);
		});

		test('login with the correct data', () => {
			const initialState = {
				email: '',
				password: '',
				loading: false,
				emailError: false,
				passwordError: false,
			}
		
			const wrapper = shallow(<Login {...initialState} />);
			const myMock = jest.fn();	
			wrapper.instance().handleSubmit = myMock;
			wrapper.instance().forceUpdate();

			wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'test@example.com'}});
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin'}});
			expect(myMock.mock.calls.length).toBe(0);

			wrapper.find('form').simulate('submit');
			expect(myMock.mock.calls.length).toBe(1);

			expect(wrapper.state('emailError')).toBe(false);
			expect(wrapper.state('passwordError')).toBe(false);
			
		});

		test('login with the in-correct inputs', () => {
			const initialState = {
				email: '',
				password: '',
				loading: false,
				emailError: false,
				passwordError: false,
			}
			const wrapper = shallow( <Login {...initialState} />);
			wrapper.find('input[type="text"]').simulate('change', {
					target: {
						name: 'email', 
						value: 'test1'
					}});
			wrapper.find('input[type="password"]').simulate('change', {
					target: {
						name: 'password', 
						value: ' '
					}});

			const preventDefault = jest.fn();
			expect(preventDefault.mock.calls.length).toBe(0);
			wrapper.find('form').simulate('submit', { preventDefault });
			expect(preventDefault.mock.calls.length).toBe(1);
			expect(wrapper.state('emailError')).toBe(true);
			// will pass because space is a valid pw
			expect(wrapper.state('passwordError')).toBe(false);
		});
	});
});