/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OrdersTab from "./src/components/OrdersTab";
import OrdersTabTester from "./src/testers";

AppRegistry.registerComponent(appName, () => OrdersTabTester);
