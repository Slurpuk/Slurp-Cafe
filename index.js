/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OrderComponent from './components/OrderComponent'

AppRegistry.registerComponent(appName, () => OrderComponent);
