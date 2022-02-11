/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OrderCard from './src/components/OrderCard'
import OrdersPage from "./src/components/OrdersPage";
import OrdersTabTester from "./src/testers";

AppRegistry.registerComponent(appName, () => OrdersTabTester);
