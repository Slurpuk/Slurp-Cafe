/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import OrdersTester from "./src/testers";

AppRegistry.registerComponent(appName, () => OrdersTester);
