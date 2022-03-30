import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import textStyles from '../stylesheets/textStyles';
import firebase from '@react-native-firebase/app';
import {Alerts} from '../static-data';

const LogInPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );

  /**
    Manage response to database failure
     */
  function handleForgotPasswordErrorsBackEnd(errorCode) {
    if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else if (errorCode === 'auth/invalid-email') {
      Alerts.badEmailAlert();
    } else if (errorCode === 'auth/user-not-found') {
      /**
            We send the same success message if user not found to avoid letting
            malicious users that there is or isn't a user with a certain email.
             */
      Alerts.resetPasswordAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  /**
    Send verification email to user to reset their password
     */
  async function forgotPassword() {
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Add Email',
        'Please enter your email correctly in the field above to reset your password.',
      );
    } else {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => Alerts.resetPasswordAlert())
        .catch(error => handleForgotPasswordErrorsBackEnd(error.code));
    }
  }

  /**
   *Deal with bad or empty inputs before sending request
   * @return boolean Expressing the validity of the fields front-end wise
   */
  function handleLogInErrorsFrontEnd() {
    let validity = true;
    if (email === '') {
      validity = false;
      Alert.alert('Empty Email', 'Please enter your email.');
    } else if (!emailRegex.test(email)) {
      validity = false;
      Alerts.badEmailAlert();
    } else if (password === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your password.');
    }
    return validity;
  }

  /**
    Manage response to database failure
     */
  function handleLogInErrorsBackEnd(errorCode) {
    if (
      errorCode === 'auth/wrong-password' ||
      errorCode === 'auth/user-not-found'
    ) {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/invalid-email') {
      Alerts.badEmailAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  /**
   * Sign the coffee shop in if everything if verified front end wise.
   * It will catch the errors and show them in form of alerts
   */
  async function authenticateCoffeeShop() {
    if (handleLogInErrorsFrontEnd()) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => handleLogInErrorsBackEnd(error.code));
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Text style={textStyles.formTitle}>Log In</Text>
      </View>
      <View style={styles.paddedContainer}>
        <View style={styles.formContainer}>
          <FormField
            title={'Email'}
            placeholder={'business@coolcoffee.com'}
            setField={setEmail}
            type={'email'}
            value={email}
          />
          <FormField
            title={'Password'}
            setField={setPassword}
            type={'password'}
            value={password}
          />
          <Text style={[textStyles.hyperlink]} onPress={forgotPassword}>
            Forgot your password?
          </Text>
          <Text
            style={[textStyles.hyperlink]}
            onPress={() => navigation.navigate('Sign Up Page One')}
          >
            New? Create an account
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            color={'green'}
            text={'Log In'}
            onPress={authenticateCoffeeShop}
            widthRatio={0.91}
            buttonHeight={70}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: '12%',
    paddingHorizontal: '5%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '5%',
  },
  formContainer: {
    flex: 1,
    paddingVertical: '10%',
  },
  paddedContainer: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: '5%',
  },

  buttonContainer: {
    marginBottom: '4%',
    flex: 2,
    justifyContent: 'flex-end',
  },
});

export default LogInPage;
