import SECTIONS from "../data/OrderTabSectionsData";
import {Dimensions, PixelRatio, Platform} from "react-native";
import firestore from "@react-native-firebase/firestore";
import TabStatuses from "../data/TabStatuses";
import mapper from "./mapper";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

export const updatePage = (newIndex, setIndex, setStatus) => {
    setIndex(newIndex);
    setStatus(SECTIONS[newIndex]);
};

export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

export const toggleSwitch = (setIsEnabled, coffeeShopRef, isEnabled) =>
{
    setIsEnabled(prevState => !prevState)
    firestore().collection('CoffeeShop').doc(coffeeShopRef).update({
        IsOpen: !isEnabled
    }).then(null)
}

export function goToAccountManagement(navigation) {
    navigation.navigate('Account Management');
}

export async function setOrderStatus(order, status, orders, currTabStatus, setCurrentOrders){
    // Update status in backend
    await firestore().collection('Orders').doc(order.key).update({
        Status: status
    }).then(r =>{
        updateCurrentOrders(null, orders, currTabStatus, setCurrentOrders);
        console.log('status updated')})
}


/* Filters which orders to display */
export function updateCurrentOrders(newOrders = null, orders, currTabStatus, setCurrentOrders){
    let ordersList = newOrders === null ? orders: newOrders;
    if (currTabStatus === TabStatuses.ALL){
        let excluded = mapper(TabStatuses.FINISHED);
        setCurrentOrders(ordersList.filter(order => excluded.indexOf(order.Status) === -1));
    }
    else {
        let target = mapper(currTabStatus);
        let result = ordersList.filter(order => target.indexOf(order.Status) !== -1);
        setCurrentOrders(result);
    }
}

export function changeTabStatus(status, currTabStatus, setCurrTabStatus, setTabStatus){
    setCurrTabStatus(status);
    setTabStatus(status);
}
