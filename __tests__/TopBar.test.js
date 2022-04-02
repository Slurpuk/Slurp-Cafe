import {render} from '@testing-library/react-native';
import React from 'react';
import TopBar from '../src/components/ShopManagement/TopBar';
import {GlobalContext} from '../App';

const globalContextMock = {
  coffeeShop: {
    is_open:true,
  },
};

describe('Top Bar Component', function () {
  describe('Toggling Switch', function () {
    it('Correctly displays when Accepting Orders', async function () {
      const {getByText, getByTestId} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <TopBar />
        </GlobalContext.Provider>,
      );

      const acceptingOrdersYes = getByText('Yes');
      expect(acceptingOrdersYes).toBeTruthy();
      const mySwitch = getByTestId('switch');
      expect(mySwitch).toBeTruthy();
      expect(mySwitch.props.thumbColor).toBe('#218F89');
    });
    it('Correctly displays when NOT Accepting Orders', async function () {
      const globalContextMock1 = {
        coffeeShop: {
          is_open: false,
        },
      };
      const {getByText, getByTestId} = render(
        <GlobalContext.Provider value={globalContextMock1}>
          <TopBar />
        </GlobalContext.Provider>,
      );

      const acceptingOrdersYes = getByText('No');
      expect(acceptingOrdersYes).toBeTruthy();
      const mySwitch = getByTestId('switch');
      expect(mySwitch).toBeTruthy();
      expect(mySwitch.props.thumbColor).toBe('#BE1753');
    });
  });
});
