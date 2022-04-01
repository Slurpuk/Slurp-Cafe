import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {OrderCardContext} from '../src/components/OrderManagement/contexts';
import {AnimatedCardContext} from '../src/components/OrderManagement/contexts';
import ExpandedOrder from '../src/components/OrderManagement/OrderCard/ExpandedOrder';
import ReducedOrder from '../src/components/OrderManagement/OrderCard/ReducedOrder';
import {DeleteButton} from '../src/components/OrderManagement/OrderCard/ActionButtons';
import AnimatedCard from '../src/sub-components/AnimatedCard';
import {Dimensions} from 'react-native';

let testItems = [
  {
    key: 1,
    ItemRef: 'Americano',
    Quantity: 1,
    Price: 2.5,
    Type: 'Coffee',
    options: [{Name: 'Dairy', Type: 'Milk', key: 1}],
    Bean: 'Kenyan Single Origin',
  },
  {
    key: 1,
    ItemRef: 'Espresso',
    Quantity: 2,
    Price: 1.7,
    Type: 'Coffee',
    options: [{Name: 'Oat', Type: 'Milk', key: 1}],
    Bean: 'Ethiopian Single Origin',
  },
  {
    key: 1,
    ItemRef: 'Latte',
    Quantity: 3,
    Price: 1.7,
    Type: 'Coffee',
    options: [{Name: 'Soy', Type: 'Milk', key: 1}],
    Bean: 'Kenyan Blend',
  },
  {
    key: 1,
    ItemRef: 'Latte',
    Quantity: 1,
    Price: 2.4,
    Type: 'Coffee',
    options: [{Name: 'Coconut', Type: 'Milk', key: 1}],
    Bean: 'Yucky Nescafe',
  },
  {
    key: 1,
    ItemRef: 'Latte',
    Quantity: 1,
    Price: 2.4,
    Type: 'Coffee',
    options: [
      {Name: 'Coconut', Type: 'Milk', key: 1},
      {Name: 'Caramel', Type: 'Syrup', key: 2},
    ],
    Bean: 'Yucky Nescafe',
  },
  {key: 1, ItemRef: 'Croissant', Quantity: 1, Price: 3.5, Type: 'Snack'},
];

const orderCardContextMock = {
  order: {
    key: 1,
    data: {
      Items: {testItems},
      Total: 5,
      user: {
        FirstName: 'Pascual',
      },
      eta: 8,
      FinishedTime: {
        seconds: 30,
      },
    },
    currStatus: 'collected',
  },
};

const animatedCardContextMock = {
  isExpanded: true,
};

describe('Animated Card Component', function () {
  describe('Displays correctly', function () {
    it('Displays Delete button when passed in bottom fixed', async function () {
      const {getByTestId} = render(
        <AnimatedCard
          collapsableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ReducedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          hidableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ExpandedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          initialHeight={Dimensions.get('window').height * 0.14}
          bottomFixed={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <DeleteButton />
            </OrderCardContext.Provider>
          }
        />,
      );

      const removeText = getByTestId('removeText');
      expect(removeText).toBeTruthy();
    });
    it('Doesnt display delete button when bottom fixed is null', async function () {
      const {getByTestId, queryByTestId} = render(
        <AnimatedCard
          collapsableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ReducedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          hidableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ExpandedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          initialHeight={Dimensions.get('window').height * 0.14}
          bottomFixed={null}
        />,
      );

      const bottomFixed = getByTestId('bottomFixed');
      expect(bottomFixed.props.children).toBeNull();
      const removeText = queryByTestId('removeText');
      expect(removeText).toBeNull();
    });
    it('Changes height accordingly and arrow changes rotation', async function () {
      const {getByTestId} = render(
        <AnimatedCard
          collapsableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ReducedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          hidableContent={
            <OrderCardContext.Provider value={orderCardContextMock}>
              <AnimatedCardContext.Provider value={animatedCardContextMock}>
                <ExpandedOrder toFixed />
              </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>
          }
          initialHeight={Dimensions.get('window').height * 0.14}
          bottomFixed={null}
        />,
      );

      const animatedView = getByTestId('animatedPressable');

      const expandedContent = getByTestId('hidableContent');
      fireEvent(expandedContent, 'layout', {
        nativeEvent: {layout: {height: 500}},
      });

      const reducedContent = getByTestId('collapsableContent');
      fireEvent(reducedContent, 'layout', {
        nativeEvent: {layout: {height: 500}},
      });

      const arrow = getByTestId('arrow');
      expect(arrow.props.style[0].transform[0].rotateZ).toBe('0deg');

      await fireEvent(animatedView, 'press');
    });
  });
});
