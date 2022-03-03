/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import OrdersPageTester from "./src/testers";
import etaLogic from "./src/screens/etaLogic";
import OrdersPage from "./src/screens/OrdersPage";
import ReducedOrder from "./src/components/ReducedOrder";

AppRegistry.registerComponent(appName, () => OrdersPage);


