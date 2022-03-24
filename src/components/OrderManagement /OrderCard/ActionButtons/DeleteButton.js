import React from "react";
import {Alert, Pressable, Text} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext} from "react";
import {OrderCardContext, OrdersContext} from "../../contexts";
import {StyleSheet} from "react-native";

const DeleteButton = () => {
    const ordersContext = useContext(OrdersContext);
    const orderCardContext = useContext(OrderCardContext);
    const order = orderCardContext.order;

    function deleteOrder(){
        ordersContext.removeOrder(order.data).catch(error => {console.log(error)});
    }

    return(
        <Pressable
            onPress={deleteOrder}
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
        >
            <Icon name={'trash-can'} size={24} color={'#CD5160'} />
            <Text style={[styles.text, {color: '#CD5160'}]}>Remove</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontWeight: '400',
    },
});

export default DeleteButton;
