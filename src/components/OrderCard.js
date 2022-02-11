/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
    View,
} from 'react-native';
import ReducedOrder from "./ReducedOrder";
import ExpandedOrder from "./ExpandedOrder";
import OrderStatuses from "./OrderStatuses";
import OrdersData from "../fake-data/OrdersData";

const OrderCard = (props) => {

    const [total, setTotal] = useState(9.4)

    const [orderStatus, setOrderStatus] = useState(OrderStatuses.INCOMING)

    const [orders, setOrders] = useState(OrdersData);

    return (
        <View>
            {orderStatus === OrderStatuses.REJECTED || orderStatus === OrderStatuses.FINISHED ? null :
                <View>
                {orderStatus === OrderStatuses.EXPANDED ?
                    <ExpandedOrder orders={orders} orderStatus={orderStatus} setOrderStatus={setOrderStatus} total={total}/>
                    :
                    <ReducedOrder orders={orders} orderStatus={orderStatus} setOrderStatus={setOrderStatus} total={total} />
            }
                </View>
            }
        </View>
    );
};

export default OrderCard;
