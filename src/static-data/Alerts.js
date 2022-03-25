import {Alert} from 'react-native';
import {AlertMessage} from './AlertMessages';

export const Alerts = {
    databaseErrorAlert: (error) => {
        Alert.alert(AlertMessage.DATABASE.title, AlertMessage.DATABASE.message + ' please quote: ' + error.code);
    },
    connectionErrorAlert: (error) => {
        Alert.alert(AlertMessage.CONNECTION.title, AlertMessage.CONNECTION.message + ' please quote: ' + error.code);
    },
};
