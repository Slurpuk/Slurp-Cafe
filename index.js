/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import OrdersPageTester from "./src/testers";
import FakePage from './src/screens/FakePage'
import OrdersPage from "./src/screens/OrdersPage";

AppRegistry.registerComponent(appName, () => OrdersPage);


