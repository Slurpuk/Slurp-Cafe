import SECTIONS from "../data/OrderTabSectionsData";
import {Dimensions, PixelRatio, Platform} from "react-native";
import firestore from "@react-native-firebase/firestore";
import TabStatuses from "../data/TabStatuses";
import mapper from "./mapper";
import {Alerts} from '../data/Alerts';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 300;

/**
 * Updates the page
 * @param newIndex - the index we switch to
 * @param setIndex - the setter function for the index
 * @param setStatus - the setter function for the status
 */
export const updatePage = (newIndex, setIndex, setStatus) => {
    setIndex(newIndex);
    setStatus(SECTIONS[newIndex]);
};

/**
 * Scales the size to the size of the screen
 * @param size of the object/component
 * @returns {number} the new, scaled size
 */
export function normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

/**
 * Toggles the on/off switch that sets the shop to open/close
 * @param setIsEnabled setter function for the boolean isEnabled
 * @param coffeeShopRef the reference to the logged in coffee shop
 * @param isEnabled a boolean value that tells us whether the shop is open
 */
export const toggleSwitch = (setIsEnabled, coffeeShopRef, isEnabled) =>
{
    setIsEnabled(prevState => !prevState)
    firestore().collection('CoffeeShop').doc(coffeeShopRef).update({
        IsOpen: !isEnabled
    }).then(null).catch((error) => Alerts.databaseErrorAlert(error))
}

/**
 * Navigates to the account management page
 * @param navigation navigation between pages
 */
export function goToAccountManagement(navigation) {
    navigation.navigate('Account Management');
}

/**
 * Sets the order status in the database
 * @param order the relevant order
 * @param status the new status of the order
 * @param orders all orders
 * @param currTabStatus the current tab
 * @param setCurrentOrders a setter function for the current orders
 * @returns {Promise<void>} a response from the database
 */
export async function setOrderStatus(order, status, orders, currTabStatus, setCurrentOrders){
    await firestore().collection('Orders').doc(order.key).update({
        Status: status
    }).then(() => updateCurrentOrders(null, orders, currTabStatus, setCurrentOrders)).catch((error) => Alerts.databaseErrorAlert(error))
}

/**
 * Updates the current orders
 * @param newOrders the updated orders
 * @param orders the list of all orders
 * @param currTabStatus the current tab status
 * @param setCurrentOrders a setter function for current orders
 */
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

/**
 * Chages the tab status
 * @param status the status we want to switch to
 * @param currTabStatus the current tab status
 * @param setCurrTabStatus a setter function for the current tab status
 * @param setTabStatus a setter function for the tab status
 */
export function changeTabStatus(status, currTabStatus, setCurrTabStatus, setTabStatus){
    setCurrTabStatus(status);
    setTabStatus(status);
}
