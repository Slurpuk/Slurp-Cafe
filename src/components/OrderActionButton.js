import {Pressable, StyleSheet, Text} from "react-native";
import OrderStatuses from "./OrderStatuses";
import React from 'react';
import PrimaryButton from "../sub-components/PrimaryButton";

const OrderActionButton = ({status, setOrderStatus, accept}) => {
    let newStyle = null;
    let newStatus = null;
    let buttonText = null;
    switch(status){
        case OrderStatuses.INCOMING:
            buttonText = 'View Order'
            newStyle = styles.incomingButton
            newStatus = OrderStatuses.EXPANDED
            break
        case OrderStatuses.ACCEPTED:
            buttonText = 'Mark as ready'
            newStyle = styles.acceptedButton
            newStatus = OrderStatuses.READY
            break
        case OrderStatuses.READY:
            buttonText = 'Mark as collected'
            newStyle = styles.readyButton
            newStatus = OrderStatuses.FINISHED
            break
        case OrderStatuses.EXPANDED:
            buttonText = accept ? 'Accept order': 'Reject order'
            newStyle = accept ? styles.acceptButton: styles.rejectButton
            newStatus = accept ? OrderStatuses.ACCEPTED: OrderStatuses.REJECTED
            break
    }

    console.log(newStatus)
    return(
        <PrimaryButton newStyle={newStyle} buttonText={buttonText}/>
    )
}

const styles = StyleSheet.create({
    incomingButton:{
        backgroundColor: '#D2AD2B',
    },
    acceptedButton:{
        backgroundColor: '#4273D3',
    },
    readyButton:{
        backgroundColor: '#218F89',
    },
    acceptButton:{
        backgroundColor: '#4273D3',
    },
    rejectButton:{
        backgroundColor: 'red'
    },
});

export default OrderActionButton;

