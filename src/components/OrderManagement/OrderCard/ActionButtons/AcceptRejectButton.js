
import React, {useContext} from 'react';
import PrimaryButton from "../../../../sub-components/PrimaryButton";
import {OrderCardContext, OrdersContext} from "../../contexts";
import {Alerts, OrderStatuses} from "../../../../static-data";
import {setOrderStatus, updateFinishedTime} from "../../../../firebase";

const AcceptRejectButton = ({accept}) => {
    const orderCardContext = useContext(OrderCardContext);
    const order = orderCardContext.order;

    const updateStatus = () => {
            if (accept) {
                setOrderStatus(order.data, OrderStatuses.ACCEPTED);
            } else {
                updateFinishedTime(order.data)
                    .then(() => setOrderStatus(order.data, OrderStatuses.REJECTED))
            }
    };

    return (
        <PrimaryButton color={accept ? '#4273D3': 'red'} buttonText={accept ? 'Accept order'
            : 'Reject order'} onPress={updateStatus}/>
    );
};

export default AcceptRejectButton;
