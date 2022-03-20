import React, {useEffect, useRef, useState} from 'react';
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
    const coffeeShopRef = useRef(null);
    const [coffeeShopObj, setCoffeeShopObj] = useState(null);

    useEffect(() => {
        if(coffeeShopRef.current) {
            const subscriber = firestore()
                .collection('CoffeeShop')
                .doc(coffeeShopRef.current)
                .onSnapshot(querySnapshot => {
                    setCoffeeShopObj(querySnapshot.data());
                })

            return () => subscriber;
        }
    }, [])


  /*
  Use effect listens to changes in the authentication like logouts or logins and changes states accordingly.
   */
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(coffeeShop => {
      if (coffeeShop) {
          setCoffeeShop().then(() => {
              setIsLoggedIn(true);
              setCurrentUser(coffeeShop);
              console.log('coffee shop set sfswdvwew');
          });
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

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
  Creates the stack overr which the pages are laid; enables navigation.
   */
  const Stack = createNativeStackNavigator();

  return (
      <GlobalContext.Provider
          value={{
              currentUser: currentUser, // Returns the authentication object
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


