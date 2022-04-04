/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from "./App";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const EMULATOR_MODE_ON = true;

if (__DEV__ && EMULATOR_MODE_ON) {
    try {
        auth().useEmulator('http://127.0.0.1:9099');
        firestore().useEmulator('127.0.0.1', 8080);
    } catch (e) {
        console.log(e);
    }
}

AppRegistry.registerComponent(appName, () => App);


