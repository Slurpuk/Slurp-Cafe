import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import OrdersPage from "./src/screens/OrdersPage";
import AuthenticationPage from "./src/screens/AuthenticationPage";
import AccountManagementPage from "./src/screens/AccountManagementPage";

export const GlobalContext = React.createContext();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(auth().currentUser);
    const [coffeeShopRef, setCoffeeShopRef] = useState(null);
    const [coffeeShopObj, setCoffeeShopObj] = useState(null);

    /*
    Use effect that listens to changes in the coffeeShop. PROBABLY UNNECESSARY, removing caused bugs but this feels
    unnecesary thanks to new system.
     */
  useEffect(() => {
    const subscriber = firestore()
        .collection('CoffeeShop')
        .doc(coffeeShopRef)
        .onSnapshot(documentSnapshot => {
          setCoffeeShopObj(documentSnapshot.data());
        });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [coffeeShopRef]);

  /*
  Use effect listens to changes in the authentication like logouts or logins and changes states accordingly.
   */
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(coffeeShop => {
      if (coffeeShop) {
        setIsLoggedIn(true);
        setCurrentUser(coffeeShop);
        setCoffeeShop();
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  });

    /*
    Function to link the authentication entry to the CoffeeShop model via the email.
     */
  async function setCoffeeShop() {
    if (currentUser) {
      await firestore()
          .collection('CoffeeShop')
          .where('Email', '==', currentUser.email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              setCoffeeShopRef(documentSnapshot.id);
            });
          });
    }
  }

  /*
  Creates the stack over which the pages are laid; enables navigation.
   */
  const Stack = createNativeStackNavigator();

  return (
      <GlobalContext.Provider
          value={{
              currentUser: currentUser, // Returns the authentication object
              coffeeShopRef: coffeeShopRef,
              coffeeShopObj: coffeeShopObj, // Returns the model object
          }}
      >
        <NavigationContainer>
          {isLoggedIn ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Orders Page" component={OrdersPage} />
                  <Stack.Screen name="Account Management" component={AccountManagementPage} />
              </Stack.Navigator>
          ) : (
              <AuthenticationPage/>
          )}
        </NavigationContainer>
      </GlobalContext.Provider>
  );
};


