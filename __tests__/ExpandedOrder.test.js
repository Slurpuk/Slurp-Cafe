import {render} from '@testing-library/react-native';
import React from 'react';
import {OrderCardContext} from '../src/components/OrderManagement/contexts';
import {AnimatedCardContext} from '../src/components/OrderManagement/contexts';
import ExpandedOrder from '../src/components/OrderManagement/OrderCard/ExpandedOrder';

let testItems = [
  {
    name: 'Americano',
    price: 2.5,
    type: 'Coffee',
    has_options:false,
    amount:1,
  },
  {
    name: 'Latte',
    price: 1.7,
    type: 'Coffee',
    has_options: false,
    amount:2,

  },
];

const orderCardContextMock = {
  order: {
    data: {
      items: testItems,
    },
    currStatus: 'incoming',
  },
};

const animatedCardContextMock = {
  isExpanded: true,
};

describe('Expanded Order Component', function () {
  describe('Displays correctly', function () {
    it('Displays Total to 2 decimal points and with pound sign', async function () {
      const {getByTestId} = render(
        <OrderCardContext.Provider value={orderCardContextMock}>
          <AnimatedCardContext.Provider value={animatedCardContextMock}>
            <ExpandedOrder toFixed />
          </AnimatedCardContext.Provider>
        </OrderCardContext.Provider>,
      );

      const totalPrice = getByTestId('totalPrice');
      expect(totalPrice).toBeTruthy();
      expect(totalPrice.props.children[0]).toBe('£');
      expect(totalPrice.props.children[1]).toBe('5.90');
    });
    it('Displays Accept and Reject buttons on Incoming Order', async function () {
      const {getByTestId} = render(
        <OrderCardContext.Provider value={orderCardContextMock}>
          <AnimatedCardContext.Provider value={animatedCardContextMock}>
            <ExpandedOrder toFixed />
          </AnimatedCardContext.Provider>
        </OrderCardContext.Provider>,
      );

      const buttons = getByTestId('buttons');
      const acceptButton = buttons.props.children[0];
      const rejectButton = buttons.props.children[1];
      expect(acceptButton).toBeTruthy();
      expect(rejectButton).toBeTruthy();
      expect(acceptButton.props.accept).toBe(true);
      expect(rejectButton.props.accept).toBe(false);
    });
    it('Doesnt display Accept and Reject buttons on order that is not incoming', async function () {
      const orderCardContextMock1 = {
        order: {
          data: {
            items:[] ,
            total: 5,
          },
          currStatus: 'collected',
        },
      };
      const {queryByTestId} = render(
        <OrderCardContext.Provider value={orderCardContextMock1}>
          <AnimatedCardContext.Provider value={animatedCardContextMock}>
            <ExpandedOrder toFixed />
          </AnimatedCardContext.Provider>
        </OrderCardContext.Provider>,
      );

      const buttons = queryByTestId('buttons');
      expect(buttons).toBeNull();
     });
    it('Displays correct quantity of items and render correctly', async function () {
      const {queryByTestId} = render(
        <OrderCardContext.Provider value={orderCardContextMock}>
          <AnimatedCardContext.Provider value={animatedCardContextMock}>
            <ExpandedOrder toFixed />
          </AnimatedCardContext.Provider>
        </OrderCardContext.Provider>,
      );

      const viewListOrders = queryByTestId('viewListOrders');
      const ordersArray = viewListOrders.props.children.props.data;
      expect(ordersArray.length).toBe(2);
      const firstOrder = ordersArray[0];
      expect(firstOrder.name).toBe('Americano');
      expect(firstOrder.amount).toBe(1);
    });
  });
});
