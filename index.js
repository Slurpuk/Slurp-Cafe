/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OrdersTabTester from "./src/testers";

AppRegistry.registerComponent(appName, () => OrdersTabTester);
