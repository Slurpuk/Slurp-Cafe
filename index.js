/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import OrdersPageTester from "./src/testers";
import etaLogic from "./src/screens/etaLogic";
import ReducedOrder from "./src/components/ReducedOrder";
import FakePage from './src/screens/FakePage'
import OrdersPage from "./src/screens/OrdersPage";
import App from "./App";

AppRegistry.registerComponent(appName, () => App);


