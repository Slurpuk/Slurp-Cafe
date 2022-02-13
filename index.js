/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import OrdersPageTester from "./src/testers";

AppRegistry.registerComponent(appName, () => OrdersPageTester);
