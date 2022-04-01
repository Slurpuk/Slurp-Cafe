import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import LogInPage from '../src/screens/LogInPage';
import {Alert} from 'react-native';

describe('Log In Page', function () {
    const spyAlert = jest
        .spyOn(Alert, 'alert')
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
            callbackOrButtons[1].onPress(),
        );

    afterEach(() => spyAlert.mockClear());

    describe('Pressing log in => form field tests', function () {
        it('should raise alert on submit with empty email', async function () {
            const {getAllByText} = render(<LogInPage/>);

            fireEvent(getAllByText('Log In')[1], 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty Email');
        });
        it('should raise alert on email without @', async function () {
            const {getAllByText, getByPlaceholderText} = render(<LogInPage />);

            const email = getByPlaceholderText('business@coolcoffee.com');
            expect(email).toBeTruthy();

            fireEvent.changeText(email, 'emailwithoutaroba.com');

            fireEvent(getAllByText('Log In')[1], 'press');
            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
        });
        it('should raise alert on email with empty domain name', async function () {
            const {getAllByText, getByPlaceholderText} = render(<LogInPage />);

            const email = getByPlaceholderText('business@coolcoffee.com');
            expect(email).toBeTruthy();

            fireEvent.changeText(email, 'email@');

            fireEvent(getAllByText('Log In')[1], 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
        });
        it('should raise alert on empty password', async function () {
            const {getAllByText, getByPlaceholderText} = render(<LogInPage />);
            const email=getByPlaceholderText('business@coolcoffee.com');
            const password = getByPlaceholderText('');
            expect(password).toBeTruthy();
            expect(email).toBeTruthy();
            fireEvent.changeText(email, 'janedoe@gmail.com');

            fireEvent(getAllByText('Log In')[1], 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
        });
        it('should not raise alert on valid data', async function () {
            const {getAllByText,getByPlaceholderText} = render(<LogInPage />);

            const email=getByPlaceholderText('business@coolcoffee.com');
            const password = getByPlaceholderText('');
            expect(email).toBeTruthy();

            const emailToChange = 'janedoe@gmail.com';
            const passwordToChange = 'Password123';

            fireEvent.changeText(email, emailToChange);
            fireEvent.changeText(password, passwordToChange);

            expect(password).toBeTruthy();

            fireEvent(getAllByText('Log In')[1], 'press');

            expect(spyAlert).toHaveBeenCalledTimes(0);
        });
    });
    describe('Pressing Forgot password? => form field tests', function () {
        it('should raise alert on empty email when clicking forgot password', async function () {
            const {getByText, getByPlaceholderText} = render(<LogInPage />);

            const email = getByPlaceholderText('business@coolcoffee.com');
            expect(email).toBeTruthy();

            fireEvent.changeText(email, '');

            fireEvent(getByText('Forgot your password?'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Add Email');
        });
        it('should raise alert on faulty email when clicking forgot password', async function () {
            const {getByText, getByPlaceholderText} = render(<LogInPage />);

            const email = getByPlaceholderText('business@coolcoffee.com');
            expect(email).toBeTruthy();

            fireEvent.changeText(email, 'emailwithoutaroba');

            fireEvent(getByText('Forgot your password?'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Add Email');
        });
        it('should not raise alert when clicking forgot password with valid email', async function () {
            const {getByText, getByPlaceholderText} = render(<LogInPage />);

            const email = getByPlaceholderText('business@coolcoffee.com');
            expect(email).toBeTruthy();

            fireEvent.changeText(email, '9jumpingpotatoes@gmail.com');

            fireEvent(getByText('Forgot your password?'), 'press');

            expect(spyAlert).toHaveBeenCalledTimes(0);
        });
    });
});
