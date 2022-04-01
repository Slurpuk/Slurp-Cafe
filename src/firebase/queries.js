import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../static-data';
import {calculateTime} from '../components/OrderManagement/helpers';

/**
 * Set the status of a given order (in the database)
 * @param order The order in question
 * @param status The new status
 */
function setOrderStatus(order, status) {
  firestore()
    .collection('orders')
    .doc(order.key)
    .update({
      status: status,
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
}

/**
 * Async function that sets the finished time of a given order to the current time
 * @param order The order in question
 * @returns {Promise<void>} The promise returned by the function
 */
async function updateFinishedTime(order) {
  await firestore()
    .collection('orders')
    .doc(order.key)
    .update({
      finished_time: firestore.Timestamp.now(),
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
}

/**
 * Remove the given order from the required orders (The ones that are fetched and displayed on the order page)
 * @param order The order in question
 */
function removeOrder(order) {
  firestore()
    .collection('orders')
    .doc(order.key)
    .update({
      is_displayed: false,
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
}

/**
 * Open or close the given shop
 * @param isOpen Whether the shop is open or not
 * @param coffeeShopRef The document reference of the coffee shop
 */
function setIsOpen(isOpen, coffeeShopRef) {
  firestore()
    .doc(coffeeShopRef.path)
    .update({
      is_open: isOpen,
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
}

/**
 * Async function that returns the list of formatted items for the given order
 * @param firebaseOrder The order which items need to be formatted
 * @returns {Promise<Array>} The promise containing the list of formatted items
 */
async function getFormattedItems(firebaseOrder) {
  let newItems = [];
  await Promise.all(
    firebaseOrder.items.map(async orderItem => {
      let newItem;
      await firestore()
          .doc(orderItem.item.path)
          .get()
          .then(async doc => {
            let item = doc.data();
            newItem = {
              ...item,
              key: doc.id,
              amount: orderItem.quantity,
            };
            if (item.has_options) {
              newItem.options = await Promise.all(
                  orderItem.options.map(async option => await getOrderOption(option)),
              );
            }
            newItems.push(newItem);
          })
          .catch(error => {
            if (error.code === 'auth/network-request-failed') {
              Alerts.connectionErrorAlert();
            } else {
              Alerts.databaseErrorAlert();
            }
          });

      return newItem;
    }),
  );
  return newItems;
}

/**
 * Async function that retrieves the data of an option reference
 * @param optionRef The reference to the option
 * @returns Object The option data
 */
async function getOrderOption(optionRef) {
  let newOption;
  await firestore()
      .doc(optionRef.path)
      .get()
      .then(doc => {
        newOption = {
          ...doc.data(),
          key: doc.id,
        };
      })
      .catch(error => {
        if (error.code === 'auth/network-request-failed') {
          Alerts.connectionErrorAlert();
        } else {
          Alerts.databaseErrorAlert();
        }
      });
  return newOption;
}

/**
 * Async function that returns the user of a given order
 * @param firebaseOrder The order which user needs to be retrieved
 * @returns {Promise<Object>} The promise containing the retrieved user
 */
async function getUser(firebaseOrder) {
  let user;
  await firestore()
    .doc(firebaseOrder.user.path)
    .get()
    .then(retrievedUser => {
            user = retrievedUser.data();
        })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
  return user;
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
      getFormattedItems(firebaseOrder).then(async formattedItems => {
        firebaseOrder.items = formattedItems;
        getUser(firebaseOrder)
          .then(user => {
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
          })
          .catch(error => Alerts.databaseErrorAlert(error));
      });
    }),
  );
  return newOrders;
}

/**
 * Retrieve and return all the items in the database items model
 */
async function getAllItems(){
  let items = [];
  await firestore().collection('items').get().then(async query => {
    await Promise.all(query.docs.map(doc => {
      items.push(doc.data());
    }));
  })
  return items;
}

export {
  removeOrder,
  updateFinishedTime,
  setOrderStatus,
  setIsOpen,
  getFormattedItems,
  getUser,
  getFormattedOrders,
    getAllItems,
};
