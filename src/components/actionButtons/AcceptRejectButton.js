
import {Pressable, StyleSheet, Text} from 'react-native';
import OrderStatuses from '../../static-data/OrderStatuses';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from '../OrderManagement/OrderCard';
import PrimaryButton from "../../sub-components/PrimaryButton";
import {OrdersContext} from "../../screens/OrdersPage";
import {CardContext} from "../../sub-components/AnimatedCard";

const AcceptRejectButton = ({accept}) => {
    const orders = useContext(OrdersContext);
    const details = useContext(DetailsContext);
    const card = useContext(CardContext);

    const updateStatus = () => {
            if (accept) {
                orders.setOrderStatus(details.order, OrderStatuses.ACCEPTED).then(() => card.setExpanded(false));
            } else {
                orders.setOrderStatus(details.order, OrderStatuses.REJECTED).then(() => details.setFinished(true))
            }
    };

    return (
        <PrimaryButton color={accept ? '#4273D3': 'red'} buttonText={accept ? 'Accept order'
            : 'Reject order'} onPress={updateStatus}/>
    );
};

export default AcceptRejectButton;
