import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import OrdersPage from "./src/screens/OrdersPage";
import firebase from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import AuthenticationPage from "./src/screens/AuthenticationPage";
import {View} from "react-native";
import AccountManagementPage from "./src/screens/AccountManagementPage";
//import LogInPage from "./src/screens/LogInPage";

export const GlobalContext = React.createContext();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(auth().currentUser);
    const [coffeeShopRef, setCoffeeShopRef] = useState(null);
    const [coffeeShopObj, setCoffeeShopObj] = useState(null);

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
              <Stack.Navigator
                  screenOptions={{
                      headerShown: false,
                  }}
              >
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


