import {Alert} from 'react-native';
import {AlertMessage} from './AlertMessages';

export const Alerts = {
    databaseErrorAlert: () => {
        Alert.alert(AlertMessage.DATABASE.title, AlertMessage.DATABASE.message);
    },
    connectionErrorAlert: () => {
        Alert.alert(AlertMessage.CONNECTION.title, AlertMessage.CONNECTION.message);
    },
};
