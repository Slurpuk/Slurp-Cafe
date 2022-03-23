
import {Pressable, StyleSheet, Text} from 'react-native';
import OrderStatuses from '../OrderStatuses';
import React, {useContext, useEffect, useState} from 'react';
import {DetailsContext} from '../OrderCard';
import PrimaryButton from "../../sub-components/PrimaryButton";
import {OrdersContext} from "../../screens/OrdersPage";
import {CardContext} from "../../sub-components/AnimatedCard";

const AcceptRejectButton = ({accept}) => {
    const orders = useContext(OrdersContext);
    const details = useContext(DetailsContext);
    const card = useContext(CardContext);

    const updateStatus = () => {
            if (accept) {
                card.setExpanded(false);
                orders.setOrderStatus(details.order, OrderStatuses.ACCEPTED)
                    .catch(error => console.log(error + 'when accepting order'));
            } else {
                orders.setOrderStatus(details.order, OrderStatuses.REJECTED)
                    .catch(error => console.log(error + 'when rejecting order'));
            }
    };

    return (
        <PrimaryButton color={accept ? '#4273D3': 'red'} buttonText={accept ? 'Accept order'
            : 'Reject order'} onPress={updateStatus}/>
    );
};

export default AcceptRejectButton;
