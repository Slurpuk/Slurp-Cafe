import {Pressable, StyleSheet, Text} from "react-native";
import OrderStatuses from "./OrderStatuses";
import React from 'react';

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
        <Pressable style={[newStyle, styles.button]}
                   onPress={() => setOrderStatus(newStatus)}>
            <Text style={styles.button_text}>{buttonText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    button: {
        display: 'flex',
        padding: '5%',
        alignItems: 'center',
    },
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

