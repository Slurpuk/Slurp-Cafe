import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import SignUpPageTwo from '../src/screens/SignUpPageTwo';
import {Alert} from 'react-native';
import {SignUpContext} from '../App';

const signUpContextMock = {
  email: 'pmerita@gmail.com',
  password: 'MyPassword123',
  shopName: '',
  shopDescription: '',
};

describe('Sign Up Two Page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('Pressing Sign Up => form field tests', function () {
    it('should raise alert on submit with empty shop page name', async function () {
      const {getByText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageTwo />
        </SignUpContext.Provider>,
      );

      fireEvent(getByText('Register'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Shop Name');
    });
    it('should raise alert on less than 20 character description', async function () {
      const {getByText, getByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageTwo />
        </SignUpContext.Provider>,
      );
      const shopName = getByPlaceholderText('');
      expect(shopName).toBeTruthy();
      fireEvent.changeText(shopName, 'MyCoffeeSHop');
      const description = getByPlaceholderText(
        '150 characters describing the qualities of your coffee shop',
      );
      expect(description).toBeTruthy();
      fireEvent.changeText(description, 'a'.repeat(19));

      fireEvent(getByText('Register'), 'press');
      expect(spyAlert.mock.calls[0][0]).toBe('Description length');
    });
    it('should raise alert on more than 150 character description', async function () {
      const {getByText, getByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageTwo />
        </SignUpContext.Provider>,
      );
      const shopName = getByPlaceholderText('');
      expect(shopName).toBeTruthy();
      fireEvent.changeText(shopName, 'MyCoffeeSHop');
      const description = getByPlaceholderText(
        '150 characters describing the qualities of your coffee shop',
      );
      expect(description).toBeTruthy();
      fireEvent.changeText(description, 'a'.repeat(151));

      fireEvent(getByText('Register'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Description length');
    });
    it('should not raise alert on valid data', async function () {
      const {getByText, getByPlaceholderText} = render(
        <SignUpContext.Provider value={signUpContextMock}>
          <SignUpPageTwo />
        </SignUpContext.Provider>,
      );
      const shopName = getByPlaceholderText('');
      expect(shopName).toBeTruthy();
      const description = getByPlaceholderText(
        '150 characters describing the qualities of your coffee shop',
      );
      expect(description).toBeTruthy();
      fireEvent.changeText(shopName, 'MyCoffeeShop');
      fireEvent.changeText(description, 'a'.repeat(125));

      fireEvent(getByText('Register'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
