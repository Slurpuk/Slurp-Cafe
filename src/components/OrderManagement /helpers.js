
import TabStatuses from "../../static-data/TabStatuses";
import OrderStatuses from "../../static-data/OrderStatuses";

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

function isFinished(status){
    return mapper(TabStatuses.FINISHED).includes(status)
}

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

function calculateTime(userLatitude, userLongitude, shopLatitude,shopLongitude){
    const distance=calculateDistance(userLatitude, userLongitude, shopLatitude,shopLongitude);
    const speed=4*16.6667;
    const time=parseInt(distance/speed);
    return time;
}

function getStatusColor(eta){
    return eta <= 5 ? 'red': '#239DAD';
}

function getOptionsText(item) {
    let optionsText = '';
    item.options.forEach(option => {
        optionsText += option.Name + ' ' + option.Type + ', ';
    });
    return optionsText !== ''
        ? optionsText.substring(0, optionsText.length - 2)
        : optionsText;
}

export {isFinished, mapper, calculateTime, getStatusColor, getOptionsText};
