import {render} from '@testing-library/react-native';
import React from 'react';
import {OrderCardContext} from "../src/components/OrderManagement/contexts";
import {AnimatedCardContext} from "../src/components/OrderManagement/contexts";
import ExpandedOrder from "../src/components/OrderManagement/OrderCard/ExpandedOrder";

let testItems = [
    {key: 1, ItemRef: 'Americano', Quantity: 1, Price: 2.50, Type: 'Coffee', options: [{Name: 'Dairy', Type: 'Milk', key: 1}], Bean:'Kenyan Single Origin'},
    {key: 1, ItemRef: 'Espresso', Quantity: 2, Price: 1.70, Type: 'Coffee', options: [{Name: 'Oat', Type: 'Milk', key: 1}], Bean:'Ethiopian Single Origin'},
    {key: 1, ItemRef: 'Latte', Quantity: 3, Price: 1.70, Type: 'Coffee', options: [{Name: 'Soy', Type: 'Milk', key: 1}], Bean:'Kenyan Blend'},
    {key: 1, ItemRef: 'Latte', Quantity: 1, Price: 2.40, Type: 'Coffee', options: [{Name: 'Coconut', Type: 'Milk', key: 1}], Bean:'Yucky Nescafe'},
    {key: 1, ItemRef: 'Latte', Quantity: 1, Price: 2.40, Type: 'Coffee', options: [{Name: 'Coconut', Type: 'Milk', key: 1}, {Name: 'Caramel', Type: 'Syrup', key: 2}], Bean:'Yucky Nescafe'},
    {key: 1, ItemRef: 'Croissant', Quantity: 1, Price: 3.50, Type: 'Snack'},
];

const orderCardContextMock = {
    order:{
        data:{
            Items:{testItems},
            Total:5,
        },
        currStatus:'incoming',
    }
};

const animatedCardContextMock = {
    isExpanded:true
};



describe('Expanded Order Component', function () {


    describe('Displays correctly', function () {
        it('Displays Total to 2 decimal points and with pound sign', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ExpandedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const totalPrice=getByTestId('totalPrice');
            expect(totalPrice).toBeTruthy();
            expect(totalPrice.props.children[0]).toBe('£')
            expect(totalPrice.props.children[1]).toBe('5.00')

        });
        it('Displays Accept and Reject buttons on Incoming Order', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ExpandedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const buttons=getByTestId('buttons');
            const acceptButton=buttons.props.children[0];
            const rejectButton=buttons.props.children[1];
            expect(acceptButton).toBeTruthy();
            expect(rejectButton).toBeTruthy();

        });
        it('Doesnt display Accept and Reject buttons on order that is not incoming', async function () {
            const orderCardContextMock1 = {
                order:{
                    data:{
                        Items:{

                        },
                        Total:5,
                    },
                    currStatus:'collected',
                }
            };
            const {queryByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock1}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ExpandedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const buttons=queryByTestId('buttons');
            expect(buttons).toBeNull();

        });
        it('Displays correct quantity of items and render correctly', async function () {
            const {queryByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ExpandedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const viewListOrders=queryByTestId('viewListOrders');
            const ordersArray=viewListOrders.props.children.props.data.testItems;
            expect(ordersArray.length).toBe(6);
            const firstOrder=ordersArray[0];
            expect(firstOrder.ItemRef).toBe('Americano');
            expect(firstOrder.Quantity).toBe(1);
            expect(firstOrder.Bean).toBe('Kenyan Single Origin');
            expect(firstOrder.options[0].Name).toBe('Dairy');

        });


    });
});
