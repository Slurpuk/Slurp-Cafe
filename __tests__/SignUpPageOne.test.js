import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import SignUpPageOne from '../src/screens/SignUpPageOne';
import {Alert} from 'react-native';
import {SignUpContext} from '../App';

const signUpContextMock = {
  email: '',
  password: '',
  shopName: '',
  shopDescription: '',
};

describe('Sign Up One Page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('Pressing next => form field tests', function () {
    it('should raise alert on submit with empty email', async function () {
      const {getByText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );

      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Email');
    });
    it('should raise alert on email without @', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'emailwithoutaroba.com');

      fireEvent(getByText('Next'), 'press');
      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
    });
    it('should raise alert on email with empty domain name', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'email@');

      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
    });
    it('should raise alert on empty password', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );
      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();
      expect(inputs[1]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'janedoe@gmail.com');

      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
    });
    it('should raise alert on empty password confirmation but non-empty password', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );
      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();
      expect(inputs[1]).toBeTruthy();
      expect(inputs[2]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'janedoe@gmail.com');
      fireEvent.changeText(inputs[1], 'Password123');
      fireEvent.changeText(inputs[2], '');
      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password Confirmation');
    });
    it('should raise alert on password and password confirmation not matching up', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );
      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();
      expect(inputs[1]).toBeTruthy();
      expect(inputs[2]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'janedoe@gmail.com');
      fireEvent.changeText(inputs[1], 'Password123');
      fireEvent.changeText(inputs[2], 'NotPassword123');

      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Passwords dont match up');
    });
    it('should not raise alert on valid data', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageOne />
        </SignUpContext.Provider>,
      );
      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();
      expect(inputs[1]).toBeTruthy();
      expect(inputs[2]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'janedoe@gmail.com');
      fireEvent.changeText(inputs[1], 'Password123');
      fireEvent.changeText(inputs[2], 'Password123');

      fireEvent(getByText('Next'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
