import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import AccountManagementPage from "../src/screens/AccountManagementPage";
import {Alert} from 'react-native';
import {GlobalContext} from "../App";

const globalContextMock = {
    coffeeShopObj:{
        Name:'Kaffeine',
        Intro:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        Location:{latitude:'50',longitude:'0'}
    }
};


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
            const {getByText,getAllByPlaceholderText,debug} = render(<GlobalContext.Provider value={globalContextMock}>
                <AccountManagementPage />
            </GlobalContext.Provider>);

            const inputs=getAllByPlaceholderText('');
            const shopName=inputs[0];
             expect(shopName).toBeTruthy();
            fireEvent.changeText(shopName, '');

            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Empty Shop Name');
        });
        it('should raise alert on less than 20 character description', async function () {
            const {getAllByText, getByText, getAllByPlaceholderText} = render(<GlobalContext.Provider value={globalContextMock}>
                <AccountManagementPage />
            </GlobalContext.Provider>);

            const inputs=getAllByPlaceholderText('');
            const description=inputs[1];
            expect(description).toBeTruthy();
            fireEvent.changeText(description, '');

            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert.mock.calls[0][0]).toBe('Description length');
        });
        it('should raise alert on more than 200 character description', async function () {
            const {getByText, getAllByPlaceholderText} = render(<GlobalContext.Provider value={globalContextMock}>
                <AccountManagementPage />
            </GlobalContext.Provider>);
            const inputs=getAllByPlaceholderText('');
            const description=inputs[1];
            expect(description).toBeTruthy();
            fireEvent.changeText(description, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Description length');
        });
        it('should raise alert on latitude more than 90', async function () {
            const {getByText, getAllByPlaceholderText} = render(<GlobalContext.Provider value={globalContextMock}>
                <AccountManagementPage />
            </GlobalContext.Provider>);
            const inputs=getAllByPlaceholderText('');
            const latitude=inputs[2];
            expect(latitude).toBeTruthy();
            fireEvent.changeText(latitude, '95');

            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Location is not valid');
        });
        it('should raise alert on latitude more than 90', async function () {
            const {getByText, getAllByPlaceholderText} = render(<GlobalContext.Provider value={globalContextMock}>
                <AccountManagementPage />
            </GlobalContext.Provider>);
            const inputs=getAllByPlaceholderText('');
            const latitude=inputs[2];
            expect(latitude).toBeTruthy();
            fireEvent.changeText(latitude, '95');

            fireEvent(getByText('Save Details'), 'press');

            expect(spyAlert).toHaveBeenCalled();
            expect(spyAlert.mock.calls[0][0]).toBe('Location is not valid');
        });
    });
});
