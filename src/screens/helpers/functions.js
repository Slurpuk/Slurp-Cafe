import SECTIONS from "../../static-data/OrderTabSectionsData";
import {Dimensions, PixelRatio, Platform} from "react-native";
import firestore from "@react-native-firebase/firestore";
import TabStatuses from "../../static-data/TabStatuses";
import {Alerts} from '../../static-data';
import {mapper} from "../../components/OrderManagement/helpers";
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

/**
 * Sort the current orders in ascending order of ETA and sets the state
 * @param currOrders the current orders
 * @param currentOrders the current orders
 * @param setCurrentOrders a setter function for orders
 */
export function sortCurrentOrders(currOrders=null, currentOrders, setCurrentOrders){
    let result = currOrders === null ? currentOrders: currOrders;
    result.sort((a, b) => (a.eta > b.eta) ? 1 : -1)
    setCurrentOrders(result);
}

/**
 * Set the order's ETA
 * @param target the target
 * @param newETA the new ETA
 * @param orders orders
 * @param currTabStatus
 * @param setCurrentOrders
 */
export function setOrderETA(target, newETA, orders, currTabStatus, setCurrentOrders){
    orders.current = orders.current.map(order => order.key === target.key ? {...order, eta: newETA}: order);
    updateCurrentOrders(null, orders, currTabStatus, setCurrentOrders);
}

/**
 * Remove an order
 * @param order order to be removed
 * @returns {Promise<void>} response from database
 */
export async function removeOrder(order){
    await firestore().collection('Orders').doc(order.key).update({
        IsRequired: false,
    }).then(null).catch((error => Alerts.databaseErrorAlert(error)))
}

/**
 * Update finished time
 * @param order the order
 * @returns {Promise<void>} response from the database
 */
export async function updateFinishedTime(order){
    await firestore().collection('Orders').doc(order.key).update({
        FinishedTime: firestore.Timestamp.now(),
    })
}

