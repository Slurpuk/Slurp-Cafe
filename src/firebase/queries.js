import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../static-data';
import auth from '@react-native-firebase/auth';

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
    .catch(e => processBackEndErrors(e));
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
    .catch(e => processBackEndErrors(e));
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
    .catch(e => processBackEndErrors(e));
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
    .catch(e => processBackEndErrors(e));
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
              orderItem.options.map(
                async option => await getOrderOption(option),
              ),
            );
          }
          newItems.push(newItem);
        })
        .catch(e => processBackEndErrors(e));

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
    .catch(e => processBackEndErrors(e));
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
    .catch(e => processBackEndErrors(e));
  return user;
}

/**
 * Retrieve and return the references of all the items in the database items model
 * @return Array The list of all items
 */
async function getAllItems() {
  let items = [];
  await firestore()
    .collection('items')
    .get()
    .then(async query => {
      await Promise.all(
        query.docs.map(doc => {
          items.push(doc.ref);
        }),
      );
    })
    .catch(e => processBackEndErrors(e));
  return items;
}

/**
 * Update a coffee shop in the backend with the given parameter values
 * @param coffeeShopRef The reference to the target coffee shop
 * @param name The new name for the coffee shop
 * @param intro The new intro text for the coffee shop
 * @param location The new location  for the coffee shop
 */
async function updateCoffeeShop(coffeeShopRef, name, intro, location) {
  await firestore()
    .doc(coffeeShopRef.path)
    .update({
      name: name,
      intro: intro,
      location: new firestore.GeoPoint(location.latitude, location.longitude), //Default location: 10 Downing Street.
    })
    .catch(e => processBackEndErrors(e));
}

/**
 Simple function to log out, triggers state changes in App.
 */
async function logout() {
  await auth()
    .signOut()
    .catch(e => processBackEndErrors(e));
}

/**
 * Manages the response to database failure and shows
 * errors in the form of alerts to the user
 */
function processBackEndErrors(errorCode) {
  if (errorCode === 'auth/network-request-failed') {
    Alerts.connectionErrorAlert();
  } else {
    //Anything else
    Alerts.elseAlert();
  }
}

/**
 *  Function to link the authentication entry to the CoffeeShop model via the email.
 * @param coffeeShopAccount
 * @param setCoffeeShop
 */
async function setCoffeeShop(coffeeShopAccount, setCoffeeShop) {
  await firestore()
    .collection('coffee_shops')
    .where('email', '==', coffeeShopAccount.email)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let coffeeShop = documentSnapshot.data();
        setCoffeeShop({
          ...coffeeShop,
          ref: documentSnapshot.ref,
          location: {
            latitude: coffeeShop.location._latitude,
            longitude: coffeeShop.location._longitude,
          },
        });
      });
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert(error);
      } else {
        Alerts.databaseErrorAlert(error);
      }
    });
}

export {
  removeOrder,
  updateFinishedTime,
  setOrderStatus,
  setIsOpen,
  getFormattedItems,
  getUser,
  getAllItems,
  updateCoffeeShop,
  logout,
  setCoffeeShop,
};
