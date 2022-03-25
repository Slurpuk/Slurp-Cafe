
import React, {useContext} from 'react';
import PrimaryButton from "../../../../sub-components/PrimaryButton";
import {OrderCardContext, OrdersContext} from "../../contexts";
import {OrderStatuses} from "../../../../static-data";

const AcceptRejectButton = ({accept}) => {
    const ordersContext = useContext(OrdersContext);
    const orderCardContext = useContext(OrderCardContext);
    const order = orderCardContext.order;

    const updateStatus = () => {
            if (accept) {
                ordersContext.setOrderStatus(order.data, OrderStatuses.ACCEPTED)
                    .catch(error => console.log(error + 'when accepting order'));
            } else {
                ordersContext.updateFinishedTime(order.data)
                    .then(() => ordersContext.setOrderStatus(order.data, OrderStatuses.REJECTED))
                    .catch(error => console.log(error + 'when setting as rejected'))
            }
    };

    return (
        <PrimaryButton color={accept ? '#4273D3': 'red'} buttonText={accept ? 'Accept order'
            : 'Reject order'} onPress={updateStatus}/>
    );
};

export default AcceptRejectButton;
