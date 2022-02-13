import {Pressable, StyleSheet, Text, View} from "react-native";
import OrderStatuses from "./OrderStatuses";
import React, {useContext, useState} from 'react';
import PrimaryButton from "../sub-components/PrimaryButton";

const OrderActionButton = ({order, accept, updateOrder}) => {

    const [currentOrder, setCurrentOrder] = useState(order)

    function update(){
        setCurrentOrder(prevState => {
            prevState.status = newStatus
            console.log(prevState)
            return prevState
        })
        updateOrder(newStatus, currentOrder)
    }


    let newStatus;
    let newStyle = null;
    let buttonText = null;
    switch(currentOrder.status){
        case OrderStatuses.INCOMING:
            buttonText = 'View Order'
            newStyle = styles.incomingButton
            newStatus = OrderStatuses.EXPANDED
            break
        case OrderStatuses.ACCEPTED:
            buttonText = 'Mark as ready'
            newStatus = OrderStatuses.READY
            newStyle = styles.acceptedButton
            break
        case OrderStatuses.READY:
            buttonText = 'Mark as collected'
            newStatus = OrderStatuses.FINISHED
            newStyle = styles.readyButton
            break
        case OrderStatuses.EXPANDED:
            buttonText = accept ? 'Accept order': 'Reject order'
            newStatus = accept ? OrderStatuses.ACCEPTED: OrderStatuses.REJECTED
            newStyle = accept ? styles.acceptButton: styles.rejectButton
            break
        default:
            newStatus = currentOrder.status
    }

    return(
        <View>
        {newStyle === null ? null :
            <PrimaryButton newStyle={newStyle} buttonText={buttonText} updateOrder={() => update()}/>
        }</View>
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

