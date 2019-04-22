import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';
import ClassNames from 'classnames';
import RSVP from 'rsvp';

import { validateEmail, validateConfirmEmail, validatePassword } from '../../utils/utils';
import CreateAccount from '../CreateAccount';

describe('app/panel/components/CreateAccount Component', () => {
	describe('Snapshot test with react-test-renderer', () => {
		test('Testing account creation page is rendering', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false,
			}

			const component = renderer.create(
				shallow(<MemoryRouter>
					<CreateAccount {...initialState} />
				</MemoryRouter>)	
			).toJSON(); 
			expect(component).toMatchSnapshot();
		});

		test('Testing the account creation page is rendering with the errors showing', () => {
			const initialState= {
				email: '',
				emailError: true,
				confirmEmail: '',
				confirmEmailError: true,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: false,
				loading: true,
				passwordInvalidError: true,
				passwordLengthError: true,
			}

			const component = renderer.create(
				shallow(<MemoryRouter>
					<CreateAccount {...initialState} />
				</MemoryRouter>)	
			).toJSON(); 
			expect(component).toMatchSnapshot();
		});
	});	

	describe('Testing the handling of data input and submitting', () => {
		test('testing the input of email and password without first/last name', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false,
			}	

			const wrapper = shallow(<CreateAccount {...initialState} />);

			const email = 'test@example.com';
			expect(wrapper.state('email')).toEqual('');
			wrapper.find('#create-input-email').simulate('change', {target: {name: 'email', value: email }});
			expect(wrapper.state('email')).toEqual(email);

			expect(wrapper.state('confirmEmail')).toEqual('');
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: email }});
			expect(wrapper.state('confirmEmail')).toEqual(email);

			expect(wrapper.state('promotionsChecked')).toBe(true);

			const password = 'admin';
			expect(wrapper.state('password')).toEqual('');
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: password }});
			expect(wrapper.state('password')).toEqual(password);
		});

		test('testing the input of email and password with first/last name', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false,
			}

			const wrapper = shallow(<CreateAccount {...initialState} />);

			const email = 'test@example.com';
			expect(wrapper.state('email')).toEqual('');
			wrapper.find('#create-input-email').simulate('change', {target: {name: 'email', value: email }});
			expect(wrapper.state('email')).toEqual(email);

			expect(wrapper.state('confirmEmail')).toEqual('');
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: email }});
			expect(wrapper.state('confirmEmail')).toEqual(email);

			const firstName = 'John';
			expect(wrapper.state('firstName')).toEqual('');
			wrapper.find('#create-input-first-name').simulate('change', {target: {name: 'firstName', value: firstName }});
			expect(wrapper.state('firstName')).toEqual(firstName);

			const lastName = 'Doe';
			expect(wrapper.state('lastName')).toEqual('');
			wrapper.find('#create-input-last-name').simulate('change', {target: {name: 'lastName', value: lastName }});
			expect(wrapper.state('lastName')).toEqual(lastName);

			expect(wrapper.state('promotionsChecked')).toBe(true);

			const password = 'admin';
			expect(wrapper.state('password')).toEqual('');
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: password }});
			expect(wrapper.state('password')).toEqual(password);
		});

		test('Creation of account with correct data', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false
			}				

			const wrapper = shallow(<CreateAccount {...initialState} />);
			const myMock = jest.fn();	
			wrapper.instance().handleSubmit = myMock;
			wrapper.instance().forceUpdate();

			wrapper.find('#create-input-email').simulate('change', {target: {name: 'email', value: 'test@example.com'}});
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: 'test@example.com'}});
			wrapper.find('#create-input-first-name').simulate('change', {target: {name: 'firstName', value: 'John'}});
			wrapper.find('#create-input-last-name').simulate('change', {target: {name: 'lastName', value: 'Doe'}});	
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin'}});			

			expect(wrapper.state('promotionsChecked')).toBe(true);
			expect(myMock.mock.calls.length).toBe(0);

			wrapper.find('form').simulate('submit');
			expect(myMock.mock.calls.length).toBe(1);

			expect(wrapper.state('emailError')).toBe(false);
			expect(wrapper.state('confirmEmailError')).toBe(false);
			expect(wrapper.state('passwordInvalidError')).toBe(false);
			expect(wrapper.state('passwordLengthError')).toBe(false);
		});

		test.only('testing the creation of account with checkbox unchecked', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false
			}				

			const wrapper = shallow(<CreateAccount {...initialState} />);
			const myMock = jest.fn();	
			wrapper.instance().handleSubmit = myMock;
			wrapper.instance().forceUpdate();

			wrapper.find('#create-input-email').simulate('change', {target: {name: 'email', value: 'test@example.com'}});
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: 'test@example.com'}});
			wrapper.find('#create-input-first-name').simulate('change', {target: {name: 'firstName', value: 'John'}});
			wrapper.find('#create-input-last-name').simulate('change', {target: {name: 'lastName', value: 'Doe'}});	
			wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'admin'}});			

			wrapper.find('#promotionsChecked').simulate('change', {target: {checked: false}});	
			expect(myMock.mock.calls.length).toBe(0);

			wrapper.find('form').simulate('submit');
			expect(myMock.mock.calls.length).toBe(1);
			expect(wrapper.state('promotionsChecked')).toBe(false);
		});

		test('testing the creation of account with invalid email', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false,
			}

			const wrapper = shallow( <CreateAccount {...initialState} />);
			wrapper.find('#create-input-email').simulate('change', {
					target: {
						name: 'email', 
						value: 'test1'
					}});
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: 'test1'}});
			wrapper.find('input[type="password"]').simulate('change', {
					target: {
						name: 'password', 
						value: 'hi'
					}});
			expect(wrapper.state('promotionsChecked')).toBe(true);

			const preventDefault = jest.fn();
			expect(preventDefault.mock.calls.length).toBe(0);


			wrapper.find('form').simulate('submit',  { preventDefault });
			expect(preventDefault.mock.calls.length).toBe(1);
		
			expect(wrapper.state('emailError')).toBe(true);
		});	


		test('testing the creation of account with invalid password', () => {
			const initialState= {
				email: '',
				emailError: false,
				confirmEmail: '',
				confirmEmailError: false,
				firstName: '',
				lastName: '',
				password: '',
				promotionsChecked: true,
				loading: false,
				passwordInvalidError: false,
				passwordLengthError: false,
			}

			const wrapper = shallow( <CreateAccount {...initialState} />);
			wrapper.find('#create-input-email').simulate('change', {
					target: {
						name: 'email', 
						value: 'test@example.com'
					}});
			wrapper.find('#create-input-email-confirm').simulate('change', {target: {name: 'confirmEmail', value: 'test@example.com'}});
			wrapper.find('input[type="password"]').simulate('change', {
					target: {
						name: 'password', 
						value: 'hi'
					}});
			expect(wrapper.state('promotionsChecked')).toBe(true);

			const preventDefault = jest.fn();
			expect(preventDefault.mock.calls.length).toBe(0);


			wrapper.find('form').simulate('submit',  { preventDefault });
			expect(preventDefault.mock.calls.length).toBe(1);
		
			expect(wrapper.state('passwordLengthError')).toBe(true);	
		});
	});	
});
