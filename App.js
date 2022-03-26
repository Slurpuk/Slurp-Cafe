import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import OrdersPage from "./src/screens/OrdersPage";
import AuthenticationPage from "./src/screens/AuthenticationPage";
import AccountManagementPage from "./src/screens/AccountManagementPage";
import {Alerts} from "./src/static-data";

export const GlobalContext = React.createContext();

/**
 * Root app component initially rendered when the app boots.
 */
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentShop, setCurrentShop] = useState(auth().currentUser);
    const coffeeShopRef = useRef(null);
    const [coffeeShopObj, setCoffeeShopObj] = useState(null);

    /**
     * Side effect that listens to changes in the authentication like logouts or logins and changes states accordingly.
     */
      useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(coffeeShop => {
          if (coffeeShop) {
              setCurrentShop(coffeeShop);
              setCoffeeShop(coffeeShop).then(() => {
                  setIsLoggedIn(true);
              });
          } else {
            setIsLoggedIn(false);
            setCurrentShop(null);
          }
        });

        // Stop listening for updates when no longer required
        return () => subscriber();
      }, []);


    /**
     *  Function to link the authentication entry to the CoffeeShop model via the email.
     *  @param coffeeShop The new currently logged in coffee shop
     */
      async function setCoffeeShop(coffeeShop) {
          await firestore()
              .collection('CoffeeShop')
              .where('Email', '==', coffeeShop.email)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    coffeeShopRef.current = documentSnapshot.id;
                    setCoffeeShopObj(documentSnapshot.data());
                });
              })
              .catch(error => {
                  if (error.code === 'auth/network-request-failed') {
                      Alerts.connectionErrorAlert(error);
                  }
                  else{
                      Alerts.databaseErrorAlert(error);
                  }
              })
      }


  //Creates the stack over which the pages are laid; enables navigation.
  const Stack = createNativeStackNavigator();

  return (
      <GlobalContext.Provider
          value={{
              currentUser: currentShop, // Returns the authentication object
              coffeeShopRef: coffeeShopRef.current,
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


