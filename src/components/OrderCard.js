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

const OrderCard = (props) => {

    const [total, setTotal] = useState(9.4)

    const [orderStatus, setOrderStatus] = useState(OrderStatuses.INCOMING)

    const [order, setOrder] = useState(props.order);

    return (
        <View>
            {orderStatus === OrderStatuses.REJECTED || orderStatus === OrderStatuses.FINISHED ? null :
                <View>
                {orderStatus === OrderStatuses.EXPANDED ?
                    <ExpandedOrder order={order} orderStatus={orderStatus} setOrderStatus={setOrderStatus} total={total}/>
                    :
                    <ReducedOrder order={order} orderStatus={orderStatus} setOrderStatus={setOrderStatus} total={total} />
            }
                </View>
            }
        </View>
    );
};

export default OrderCard;
