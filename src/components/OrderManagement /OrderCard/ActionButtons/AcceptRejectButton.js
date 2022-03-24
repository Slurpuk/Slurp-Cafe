
import React, {useContext} from 'react';
import PrimaryButton from "../../../../sub-components/PrimaryButton";
import {AnimatedCardContext, OrderCardContext, OrdersContext} from "../../contexts";
import {OrderStatuses} from "../../../../static-data";

const AcceptRejectButton = ({accept}) => {
    const ordersContext = useContext(OrdersContext);
    const orderCardContext = useContext(OrderCardContext);
    const order = orderCardContext.order;
    const animatedCardContext = useContext(AnimatedCardContext);

    const updateStatus = () => {
            if (accept) {
                animatedCardContext.setExpanded(false);
                ordersContext.setOrderStatus(order.data, OrderStatuses.ACCEPTED)
                    .then(() => order.setCurrStatus(OrderStatuses.ACCEPTED))
                    .catch(error => console.log(error + 'when accepting order'));
            } else {
                ordersContext.setOrderStatus(order.data, OrderStatuses.REJECTED)
                    .then(() => order.setCurrStatus(OrderStatuses.REJECTED))
                    .catch(error => console.log(error + 'when rejecting order'));
            }
    };

    return (
        <PrimaryButton color={accept ? '#4273D3': 'red'} buttonText={accept ? 'Accept order'
            : 'Reject order'} onPress={updateStatus}/>
    );
};

export default AcceptRejectButton;
