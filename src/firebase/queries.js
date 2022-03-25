import firestore from "@react-native-firebase/firestore";
import {Alerts} from "../static-data";

/**
 * Set the status of a given order (in the database)
 * @param order The order in question
 * @param status The new status
 */
function setOrderStatus(order, status){
    firestore().collection('Orders').doc(order.key).update({
        Status: status
    }).catch(error => {
        if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
        }
        else{
            Alerts.databaseErrorAlert()
        }
    })
}

/**
 * Set the finished time of a given order to the current time
 * @param order The order in question
 */
async function updateFinishedTime(order){
    await firestore().collection('Orders').doc(order.key).update({
        FinishedTime: firestore.Timestamp.now(),
    }).catch(error => {
        if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
        }
        else{
            Alerts.databaseErrorAlert()
        }
    })
}

/**
 * Remove the given order from the required orders (The ones that are fetched and displayed on the order page)
 * @param order The order in question
 */
function removeOrder(order){
    firestore().collection('Orders').doc(order.key).update({
        IsRequired: false,
    }).catch(error => {
        if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
        }
        else{
            Alerts.databaseErrorAlert()
        }
    })
}

export {removeOrder, updateFinishedTime, setOrderStatus}
