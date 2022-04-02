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
            user: {
                first_name: 'Pascual',
            },
            eta: 8,
            finished_time: {
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
