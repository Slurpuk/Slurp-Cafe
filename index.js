/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from "./App";
import LogInPage from "./src/screens/LogInPage";
import SignUpPage from "./src/screens/SignUpPage";
import LogInPageFromUser from "./src/screens/LogInPageFromUser";

AppRegistry.registerComponent(appName, () => SignUpPage);


