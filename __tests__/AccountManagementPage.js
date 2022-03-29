import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import AccountManagementPage from "../src/screens/AccountManagementPage";
import {Alert} from 'react-native';

describe('Account Management Page', function () {
    const spyAlert = jest
        .spyOn(Alert, 'alert')
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
            callbackOrButtons[1].onPress(),
        );

    afterEach(() => spyAlert.mockClear());

    describe('Pressing Save Details => form field tests', function () {
        it('should raise alert on submit with empty shop page name', async function () {
            const {getByText} = render(<AccountManagementPage />);

            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty Shop Name');
        });
        // it('should raise alert on less than 20 character description', async function () {
        //     const {getAllByText, getByPlaceholderText} = render(<AccountManagementPage />);
        //     const shopName=getByPlaceholderText('');
        //     expect(shopName).toBeTruthy();
        //     fireEvent.changeText(shopName, 'MyCoffeeSHop');
        //     const description=getByPlaceholderText('100 characters describing the qualities of your coffee shop');
        //     expect(description).toBeTruthy();
        //     fireEvent.changeText(description, 'a');
        //
        //     fireEvent(getByText('Register'), 'press');
        //
        //     console.log(spyAlert.mock.calls[0][0]);
        //     expect(spyAlert.mock.calls[0][0]).toBe('Description length');
        // });
        // it('should raise alert on more than 200 character description', async function () {
        //     const {getByText, getByPlaceholderText} = render(<AccountManagementPage/>);
        //     const shopName=getByPlaceholderText('');
        //     expect(shopName).toBeTruthy();
        //     fireEvent.changeText(shopName, 'MyCoffeeSHop');
        //     const description=getByPlaceholderText('100 characters describing the qualities of your coffee shop');
        //     expect(description).toBeTruthy();
        //     fireEvent.changeText(description, 'kqbvlekrbvlbvhbkbwkqejvdvhjbjlhbvjhdsbjhbsjdvbhljhbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddddddddddddddddddddddddddddddddddddddddddddd');
        //
        //     fireEvent(getByText('Register'), 'press');
        //
        //     expect(spyAlert).toHaveBeenCalled();
        //     expect(spyAlert.mock.calls[0][0]).toBe('Description length');
        // });
        // it('should not raise alert on valid data', async function () {
        //     const {getByText, getByPlaceholderText} = render(<SignUpContext.Provider value={signUpContextMock}>
        //         <SignUpPageTwo />
        //     </SignUpContext.Provider>);
        //     const shopName=getByPlaceholderText('');
        //     expect(shopName).toBeTruthy();
        //     const description=getByPlaceholderText('100 characters describing the qualities of your coffee shop');
        //     expect(description).toBeTruthy();
        //     fireEvent.changeText(shopName, 'MyCoffeeShop');
        //     fireEvent.changeText(description, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
        //
        //     fireEvent(getByText('Register'), 'press');
        //
        //     expect(spyAlert).toHaveBeenCalledTimes(0);
        // });
    });
});
