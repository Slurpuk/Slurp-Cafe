import {Pressable, StyleSheet, Text, View} from "react-native";
import OrderStatuses from "./OrderStatuses";
import React, {useCallback, useContext, useState} from 'react';
import PrimaryButton from "../sub-components/PrimaryButton";

const OrderActionButton = ({order, accept, updateOrder}) => {

    const [currentStatus, setCurrentStatus] = useState(order.status)

    const update = () => {
        console.log(newStatus)
        setCurrentStatus(newStatus)
        updateOrder(newStatus, order)
    }

        let newStyle = null;
        let buttonText = null;
        let newStatus = null;

        switch(currentStatus){
            case OrderStatuses.INCOMING:
                buttonText = 'View Order'
                newStatus = OrderStatuses.EXPANDED
                newStyle = styles.incomingButton
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
        }

        return(
            <View>
                {newStyle === null ? null :
                    <PrimaryButton newStyle={newStyle} buttonText={buttonText} updateOrder={update}/>
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

