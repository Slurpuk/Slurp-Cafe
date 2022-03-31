import {render} from '@testing-library/react-native';
import React from 'react';
import {OrderCardContext} from "../src/components/OrderManagement/contexts";
import {AnimatedCardContext} from "../src/components/OrderManagement/contexts";
import ReducedOrder from "../src/components/OrderManagement/OrderCard/ReducedOrder";

/*-test it displays the eta correctly, and displays ''min  when there isnt one
-test it displays the name correctly
-displays finsihed order time if finsihed, if not it displays change status bar*/


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
            user:{
                FirstName:'Pascual',
            },
            eta:8,
            FinishedTime:{
                seconds:30,
            }
        },
        currStatus:'collected',
    }
};

const animatedCardContextMock = {
    isExpanded:false
};



describe('Expanded Order Component', function () {


    describe('Displays correctly', function () {
        it('Displays Total to 2 decimal points and with pound sign', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const totalPrice=getByTestId('totalPrice');
            expect(totalPrice).toBeTruthy();
            expect(totalPrice.props.children[0]).toBe('£')
            expect(totalPrice.props.children[1]).toBe('5.00')

        });
        it('Displays eta correctly when there is one', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const eta=getByTestId('eta');
            const etaInfo=eta.props.children;
            expect(etaInfo).toBeTruthy();
            expect(etaInfo[0]).toBe(' ');
            expect(etaInfo[1]).toBe(8);
            expect(etaInfo[2]).toBe(' min');

        });
        it('Displays eta correctly when there isnt one', async function () {
            const orderCardContextMock1 = {
                order:{
                    data:{
                        Items:{testItems},
                        Total:5,
                        user:{
                            FirstName:'Pascual',
                        },
                        eta:'',
                        FinishedTime:{
                            seconds:3,
                        }
                    },
                    currStatus:'incoming',
                }
            };
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock1}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const eta=getByTestId('eta');
            const etaInfo=eta.props.children;
            expect(etaInfo).toBeTruthy();
            expect(etaInfo[0]).toBe(' ');
            expect(etaInfo[1]).toBe('');
            expect(etaInfo[2]).toBe(' min');

        });
        it('Displays User Name', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const userName=getByTestId('userName');
            expect(userName).toBeTruthy();
            expect(userName.props.children).toBe('Pascual');

        });
        it('Displays Finished Order Time if order finished', async function () {
            const {getByTestId} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const finishTime=getByTestId('finishTime');
            expect(finishTime).toBeTruthy();
            expect(finishTime.props.children[4]).toBe('January 1 1970 at 0:00');

        });
        it('Displays mark as ready when status is colleccted', async function () {
            const orderCardContextMock = {
                order:{
                    data:{
                        Items:{testItems},
                        Total:5,
                        user:{
                            FirstName:'Pascual',
                        },
                        eta:8,
                    },
                    currStatus:'accepted',
                }
            };
            const {getByText} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const button=getByText('Mark as Ready');
            expect(button).toBeTruthy();

        });
        it('Displays mark as collected when status is ready', async function () {
            const orderCardContextMock = {
                order:{
                    data:{
                        Items:{testItems},
                        Total:5,
                        user:{
                            FirstName:'Pascual',
                        },
                        eta:8,
                    },
                    currStatus:'ready',
                }
            };
            const {getByText} = render(<OrderCardContext.Provider value={orderCardContextMock}>
                <AnimatedCardContext.Provider value={animatedCardContextMock}>
                    <ReducedOrder toFixed/>
                </AnimatedCardContext.Provider>
            </OrderCardContext.Provider>);

            const button=getByText('Mark as Collected');
            expect(button).toBeTruthy();

        });



    });
});
