import {render} from '@testing-library/react-native';
import React from 'react';
import {OrderCardContext} from "../src/components/OrderManagement/contexts";
import {AnimatedCardContext} from "../src/components/OrderManagement/contexts";
import ExpandedOrder from "../src/components/OrderManagement/OrderCard/ExpandedOrder";

const orderCardContextMock = {
    order:{
        data:{
            Items:{

            },
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

    });
});
