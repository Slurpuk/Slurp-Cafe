import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import OrdersPage from './src/screens/OrdersPage';
import AccountManagementPage from './src/screens/AccountManagementPage';
import LogInPage from './src/screens/LogInPage';
import SignUpPageOne from './src/screens/SignUpPageOne';
import SignUpPageTwo from './src/screens/SignUpPageTwo';
import {setCoffeeShop} from "./src/firebase/queries";
import firestore from "@react-native-firebase/firestore";

export const GlobalContext = React.createContext();
export const SignUpContext = React.createContext();

/**
 * Root app component initially rendered when the app boots.
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coffeeShopObj, setCoffeeShopObj] = useState(null);

  /**
   * Side effect that listens to changes in the authentication like logouts or logins and changes states accordingly.
   */
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(coffeeShop => {
      if (coffeeShop) {
        setCoffeeShop(coffeeShop, setCoffeeShopObj).then(() => {
          setIsLoggedIn(true);
        });
      } else {
        setIsLoggedIn(false);
      }
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  /**
   * Side effect that tracks changes in the model instance of the coffee shop in the database and updates the state accordingly
   * Sets the current coffee shop object accordingly.
   */
  useEffect(() => {
    if(isLoggedIn && auth().currentUser){
      const subscriber = firestore()
          .collection('coffee_shops')
          .where('email', '==', auth().currentUser.email)
          .onSnapshot(query =>{
            const coffeeShopDoc = query.docs[0];
            const coffeeShop = coffeeShopDoc.data();
            setCoffeeShopObj({
              ...coffeeShop,
              ref: coffeeShopDoc.ref,
              location: {
                latitude: coffeeShop.location._latitude,
                longitude: coffeeShop.location._longitude,},
            })
          });

      // Stop listening for updates when no longer required.
      return () => subscriber();
    }
  }, [isLoggedIn]);


  //Creates the stack over which the pages are laid; enables navigation.
  const Stack = createNativeStackNavigator();

  return (
    <GlobalContext.Provider
      value={{
        currentUser: auth().currentUser, // Returns the authentication object
        coffeeShop: coffeeShopObj, // Returns the model object
      }}
    >
      <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Orders Page" component={OrdersPage} />
            <Stack.Screen
              name="Account Management"
              component={AccountManagementPage}
            />
          </Stack.Navigator>
        ) : (
          <SignUpContext.Provider
            value={{
              email: '',
              password: '',
              shopName: '',
              shopDescription: '',
            }}
          >
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Log In Page" component={LogInPage} />
              <Stack.Screen name="Sign Up Page One" component={SignUpPageOne} />
              <Stack.Screen name="Sign Up Page Two" component={SignUpPageTwo} />
            </Stack.Navigator>
          </SignUpContext.Provider>
        )}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
