import {Alert} from 'react-native';
import {AlertMessage} from './AlertMessages';

export const Alerts = {
  databaseErrorAlert: () => {
    Alert.alert(AlertMessage.DATABASE.title, AlertMessage.DATABASE.message);
  },
  emptyEmail: () => {
    Alert.alert(AlertMessage.EMPTY_EMAIL.title, AlertMessage.EMPTY_EMAIL.message);
  },
  emptyPassword: () => {
    Alert.alert(AlertMessage.EMPTY_PASSWORD.title, AlertMessage.EMPTY_PASSWORD.message);
  },
  emptyPasswordConfirmation: () => {
    Alert.alert(AlertMessage.EMPTY_PASSWORD_CONFIRMATION.title, AlertMessage.EMPTY_PASSWORD_CONFIRMATION.message);
  },
  passwordsDontMatchUp: () => {
    Alert.alert(AlertMessage.PASSWORDS_DONT_MATCH_UP.title, AlertMessage.PASSWORDS_DONT_MATCH_UP.message);
  },
  successfulRegistration: () => {
    Alert.alert(AlertMessage.SUCCESSFUL_REGISTRATION.title, AlertMessage.SUCCESSFUL_REGISTRATION.message);
  },
  emptyShopName: () => {
    Alert.alert(AlertMessage.EMPTY_SHOP_NAME.title, AlertMessage.EMPTY_SHOP_NAME.message);
  },
  descriptionLength: () => {
    Alert.alert(AlertMessage.DESCRIPTION_LENGTH.title, AlertMessage.DESCRIPTION_LENGTH.message);
  },
  connectionErrorAlert: () => {
    Alert.alert(AlertMessage.CONNECTION.title, AlertMessage.CONNECTION.message);
  },
  tooManyRequestsAlert: () => {
    Alert.alert(
      AlertMessage.MANY_REQUESTS.title,
      AlertMessage.MANY_REQUESTS.message,
    );
  },
  wrongCredentialsAlert: () => {
    Alert.alert(
      AlertMessage.WRONG_CREDENTIALS.title,
      AlertMessage.WRONG_CREDENTIALS.message,
    );
  },
  badEmailAlert: () => {
    Alert.alert(AlertMessage.BAD_EMAIL.title, AlertMessage.BAD_EMAIL.message);
  },
  emailInUseAlert: () => {
    Alert.alert(
      AlertMessage.EMAIL_IN_USE.title,
      AlertMessage.EMAIL_IN_USE.message,
    );
  },
  weakPasswordAlert: () => {
    Alert.alert(
      AlertMessage.WEAK_PASSWORD.title,
      AlertMessage.WEAK_PASSWORD.message,
    );
  },
  resetPasswordAlert: () => {
    Alert.alert(
      AlertMessage.RESET_PASSWORD.title,
      AlertMessage.RESET_PASSWORD.message,
    );
  },
  elseAlert: () => {
    Alert.alert(AlertMessage.ELSE.title, AlertMessage.ELSE.message);
  },
  rejectingOrderAlert: reject => {
    Alert.alert(
      AlertMessage.REJECTING_ORDER.title,
      AlertMessage.REJECTING_ORDER.message,
      [
        {
          text: 'Yes',
          onPress: () => reject(),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  },
};
