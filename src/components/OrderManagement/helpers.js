import TabStatuses from '../../static-data/TabStatuses';
import OrderStatuses from '../../static-data/OrderStatuses';
import {Dimensions} from 'react-native';
import {months} from '../../static-data';
import {getFormattedItems, getUser} from "../../firebase/queries";

/**
 * Maps the tab status with the corresponding order status(es)
 * @param section the tab section in question
 * @return orderStatuses the matching order status(es)
 */
function mapper(section) {
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
 * @param status the order's status
 * @return isFinished is the order finished
 */
function isFinished(status) {
  return mapper(TabStatuses.FINISHED).includes(status);
}

/**
 * Calculate the euclidean distance between 2 coordinates
 * @param userLatitude the user's latitude
 * @param userLongitude the user's longitude
 * @param shopLatitude the shop's latitude
 * @param shopLongitude the shop's longitude
 * @return distance the distance between the 2 points
 */
function calculateDistance(
  userLatitude,
  userLongitude,
  shopLatitude,
  shopLongitude,
) {
  const R = 6371e3; // metres
  const latitude1 = (userLatitude * Math.PI) / 180;
  const latitude2 = (shopLatitude * Math.PI) / 180;
  const diffLat = ((shopLatitude - userLatitude) * Math.PI) / 180;
  const diffLon = ((shopLongitude - userLongitude) * Math.PI) / 180;
  const aa =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2);
  const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  const distance = parseInt(R * cc) * 1.5; // in meters
  return distance;
}

/**
 * Calculate the time between 2 coordinates with an average walking speed
 * @param userLatitude the user's latitude
 * @param userLongitude the user's longitude
 * @param shopLatitude the shop's latitude
 * @param shopLongitude the shop's longitude
 * @return time the walking time between the 2 points
 */
function calculateTime(
  userLatitude,
  userLongitude,
  shopLatitude,
  shopLongitude,
) {
  const distance = calculateDistance(
    userLatitude,
    userLongitude,
    shopLatitude,
    shopLongitude,
  );
  const speed = 4 * 16.6667;
  const time = parseInt(distance / speed);
  return time;
}

/**
 * Return status color based on ETA value
 * @param eta the ETA in question
 * @return color the appropriate color
 */
function getStatusColor(eta) {
  return eta <= 5 ? 'red' : '#239DAD';
}

/**
 * Retrieves the optional add-ons for a specific item if any
 * @param item Order item
 * @return A string containing the add-ons if any
 */
function getOptionsText(item) {
  if (item.has_options) {
    let text = item.options.reduce(function (acc, option) {
      return acc + option.name + ' ' + option.type + ', ';
    }, '');
    return text.substring(0, text.length - 2);
  } else {
    return '';
  }
}

/**
 * Convert seconds into an actual date
 * @param secs the time in seconds
 * @return date the formatted date
 */
function toDateTime(secs) {
  let t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  let minutes = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
  let date =
    '' +
    months[t.getMonth()] +
    ' ' +
    t.getDate() +
    ' ' +
    t.getFullYear() +
    ' ' +
    'at' +
    ' ' +
    t.getHours() +
    ':' +
    minutes;
  return date;
}

/**
 * Returns the initial height for a collapsed order based on the screen height
 * @return initialHeight the initial height
 */
function getInitialHeight() {
  return Dimensions.get('window').height * 0.14;
}

/**
 * Calculate and return the total price of the given order.
 * @return Number The total price of the order
 * @param items The list of items in the order
 */
function calculateOrderTotal(items) {
  return items.reduce(function (acc, item) {
    return acc + getItemFullPrice(item);
  }, 0);
}

/**
 * Calculate and return the total price of the options of an item
 * @param item The target item
 * @return Number The total price for the item's options
 */
function getOptionsPrice(item) {
  return item.has_options
    ? item.options.reduce(function (acc, option) {
        return acc + option.price;
      }, 0)
    : 0;
}

/**
 * Calculate and return the total price of an item (including options)
 * @param item The target item
 * @return Number The total price of the item
 */
function getItemFullPrice(item) {
  return item.amount * (item.price + getOptionsPrice(item));
}

/**
 * Async function that returns the formatted version of a given list of orders
 * @param orders The list of orders to format
 * @param shopLocation The location of the current shop
 * @returns {Promise<Array>} The promise containing the list of formatted orders
 */
async function getFormattedOrders(orders, shopLocation) {
  let newOrders = [];
  await Promise.all(
      orders.map(async order => {
        const firebaseOrder = order.data();
        firebaseOrder.items = await getFormattedItems(firebaseOrder);
        let user = await getUser(firebaseOrder);
        firebaseOrder.user = user;
        let newOrder = {
          ...firebaseOrder,
          eta: calculateTime(
              user.location._latitude,
              user.location._longitude,
              shopLocation.latitude,
              shopLocation.longitude,
          ),
          key: order.id,
        };
        newOrders.push(newOrder);
      }),
  );
  return newOrders;
}

export {
  isFinished,
  mapper,
  calculateTime,
  getStatusColor,
  getOptionsText,
  toDateTime,
  getInitialHeight,
  calculateOrderTotal,
    getFormattedOrders,
};
