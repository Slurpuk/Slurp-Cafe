
import TabStatuses from "../../static-data/TabStatuses";
import OrderStatuses from "../../static-data/OrderStatuses";
import {Dimensions} from "react-native";
import {months} from "../../static-data/Months";


/**
 * Maps the tab status with the corresponding order status(es)
 * @return orderStatuses the matching order status(es)
 */
function mapper(section){
    switch (section) {
        case TabStatuses.INCOMING:
            return [OrderStatuses.INCOMING];
        case TabStatuses.ACCEPTED:
            return [OrderStatuses.ACCEPTED];
        case TabStatuses.READY:
            return [OrderStatuses.READY];
        case TabStatuses.FINISHED:
            return [OrderStatuses.REJECTED, OrderStatuses.COLLECTED];
    }
}

/**
 * Return whether an order is finished (collected or rejected)
 * @return isFinished is the order finished
 */
function isFinished(status){
    return mapper(TabStatuses.FINISHED).includes(status)
}

/**
 * Calculate the euclidean distance between 2 coordinates
 * @return distance the distance between the 2 points
 */
function calculateDistance(userLatitude, userLongitude, shopLatitude,shopLongitude){
    const R = 6371e3; // metres
    const latitude1 = userLatitude * Math.PI/180;
    const latitude2 = shopLatitude * Math.PI/180;
    const diffLat = (shopLatitude-userLatitude) * Math.PI/180;
    const diffLon = (shopLongitude-userLongitude) * Math.PI/180;
    const aa = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
        Math.cos(latitude1) * Math.cos(latitude2) *
        Math.sin(diffLon/2) * Math.sin(diffLon/2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
    const distance = parseInt(R * cc)*1.5; // in meters
    return distance;
}

/**
 * Calculate the time between 2 coordinates with an average walking speed
 * @return time the walking time between the 2 points
 */
function calculateTime(userLatitude, userLongitude, shopLatitude,shopLongitude){
    const distance=calculateDistance(userLatitude, userLongitude, shopLatitude,shopLongitude);
    const speed=4*16.6667;
    const time=parseInt(distance/speed);
    return time;
}

/**
 * Return status color based on ETA value
 * @return color the appropriate color
 */
function getStatusColor(eta){
    return eta <= 5 ? 'red': '#239DAD';
}

/**
 * Return formatted options text display for an item's options
 * @return optionsText the text
 */
function getOptionsText(item) {
    let optionsText = '';
    item.options.forEach(option => {
        optionsText += option.Name + ' ' + option.Type + ', ';
    });
    return optionsText !== ''
        ? optionsText.substring(0, optionsText.length - 2)
        : optionsText;
}

/**
 * Convert seconds into an actual date
 * @return date the formatted date
 */
function toDateTime(secs) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let minutes = t.getMinutes() < 10 ? '0' + t.getMinutes(): t.getMinutes();
    let date = '' + months[t.getMonth()] + " " + t.getDate() + " " + t.getFullYear() + ' ' + 'at' +
        ' ' + t.getHours() + ':' + minutes;
    return date;
}

/**
 * Calculate the ETA based on the new user location and the shop location
 * @return ETA the new ETA
 */
function refreshETA(userLocation, shopLocation, order, setETA){
    let userLat = userLocation.latitude;
    let userLong = userLocation.longitude;
    let shopLat = shopLocation._latitude;
    let shopLong = shopLocation._longitude;
    let newETA = calculateTime(userLat, userLong, shopLat, shopLong)
    if(order.eta !== newETA) setETA(order, newETA);
    return newETA;
}

/**
 * Returns the initial height for a collapsed order based on the screen height
 * @return initialHeight the initial height
 */
function getInitialHeight(){
    return Dimensions.get('window').height * 0.14;
}

export {isFinished, mapper, calculateTime, getStatusColor, getOptionsText, toDateTime, refreshETA, getInitialHeight};
