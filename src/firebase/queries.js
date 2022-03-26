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
    .collection('Orders')
    .doc(order.key)
    .update({
      Status: status,
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
    .collection('Orders')
    .doc(order.key)
    .update({
      FinishedTime: firestore.Timestamp.now(),
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
    .collection('Orders')
    .doc(order.key)
    .update({
      IsRequired: false,
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
    .collection('CoffeeShop')
    .doc(coffeeShopRef)
    .update({
      IsOpen: isOpen,
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
    firebaseOrder.Items.map(async item => {
      await firestore()
        .collection(item.Type + 's')
        .doc(item.ItemRef)
        .get()
        .then(retrievedItem => {
          let newItem = retrievedItem.data();
          newItems.push({
            ...newItem,
            amount: item.Quantity,
            options: item.Options,
          });
        })
        .catch(error => {
          if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert(error);
          } else {
            Alerts.databaseErrorAlert(error);
          }
        });
    }),
  );
  return newItems;
}

/**
 * Async function that returns the user of a given order
 * @param firebaseOrder The order which user needs to be retrieved
 * @returns {Promise<Object>} The promise containing the retrieved user
 */
async function getUser(firebaseOrder) {
  let user;
  await firestore()
    .collection('Users')
    .doc(firebaseOrder.UserID)
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
        firebaseOrder.Items = formattedItems;
        getUser(firebaseOrder)
          .then(user => {
            firebaseOrder.user = user;
            let newOrder = {
              ...firebaseOrder,
              eta: calculateTime(
                user.latitude,
                user.longitude,
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

export {
  removeOrder,
  updateFinishedTime,
  setOrderStatus,
  setIsOpen,
  getFormattedItems,
  getUser,
  getFormattedOrders,
};
