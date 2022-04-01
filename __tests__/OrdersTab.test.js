import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import OrdersTab from '../src/components/OrderManagement/OrdersTab/OrdersTab';
import {OrdersContext} from '../src/components/OrderManagement/contexts';
import SECTIONS from '../src/static-data/OrderTabSectionsData';
const ordersContextMock = {};

describe('Orders Tab Component', function () {
  describe('Tabs', function () {
    it('Correctly displays sections when rendered', async function () {
      const {getByText, getByTestId} = render(
        <OrdersContext.Provider value={ordersContextMock}>
          <OrdersTab SECTIONS={SECTIONS} setStatus={1} />
        </OrdersContext.Provider>,
      );

      const View = getByTestId('ViewTabs');
      const tabs = View.props.children;
      expect(tabs).toBeTruthy();
      expect(tabs.props.values).toBe(SECTIONS);
      const allActive = getByText('All active');
      expect(allActive).toBeTruthy();
      const incoming = getByText('Incoming');
      expect(incoming).toBeTruthy();
      const accepted = getByText('Accepted');
      expect(accepted).toBeTruthy();
      const ready = getByText('Ready');
      expect(ready).toBeTruthy();
      const finished = getByText('Finished');
      expect(finished).toBeTruthy();
    });
    it('Correctly selects section', async function () {
      const {getByTestId} = render(
        <OrdersContext.Provider value={ordersContextMock}>
          <OrdersTab SECTIONS={SECTIONS} setStatus={1} />
        </OrdersContext.Provider>,
      );

      const View = getByTestId('ViewTabs');
      const tabs = View.props.children;
      expect(tabs).toBeTruthy();
      expect(tabs.props.selectedIndex).toBe(1);
    });
    it('Correctly changes section', async function () {
      const setStatus = jest.fn();

      const {getByText, getByTestId} = render(
        <OrdersContext.Provider value={ordersContextMock}>
          <OrdersTab SECTIONS={SECTIONS} setStatus={setStatus} />
        </OrdersContext.Provider>,
      );

      const View = getByTestId('ViewTabs');
      const tabs = View.props.children;
      expect(tabs).toBeTruthy();
      expect(tabs.props.selectedIndex).toBe(1);

      const finished = getByText('Finished');
      expect(finished).toBeTruthy();
      fireEvent(getByText('Finished'), 'press');
      expect(setStatus).toHaveBeenCalledTimes(1);
    });
  });
});
