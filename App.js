import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import OrdersPage from "./src/screens/OrdersPage";

export const GlobalContext = React.createContext();

export default function App() {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);


  return (
    <OrdersPage/>
  );
};


