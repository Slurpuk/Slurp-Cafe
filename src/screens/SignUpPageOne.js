import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import {Alerts} from '../static-data';
import textStyles from '../stylesheets/textStyles';
import CustomButton from '../sub-components/CustomButton';
import {SignUpContext} from '../../App';

/**
 * Renders the first page of the signing up process
 */
const SignUpPageOne = ({navigation}) => {
  const signUpContext = useContext(SignUpContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  /**
   * Navigates to the second page if some front ends checks are valid
   */
  async function navigateNextPage() {
    if (handleSignUpErrorsFrontEnd()) {
      navigation.navigate('Sign Up Page Two');
      signUpContext.email = email;
      signUpContext.password = password;
    }
  }

  /**
   * Deal with bad or empty inputs before sending request
   * @returns {boolean} true if it passes basic form validation
   */
  function handleSignUpErrorsFrontEnd() {
    let validity = true;
    if (email === '') {
      validity = false;
      Alerts.emptyEmail();
    } else if (!emailRegex.test(email)) {
      validity = false;
      Alerts.badEmailAlert();
    } else if (password === '') {
      validity = false;
      Alerts.emptyPassword();
    } else if (passwordConfirmation === '') {
      validity = false;
      Alerts.emptyPasswordConfirmation();
    } else if (password !== passwordConfirmation) {
      validity = false;
      Alerts.passwordsDontMatchUp();
    } else if (!passwordRegex.test(password)) {
      validity = false;
      Alerts.weakPasswordAlert();
    }
    return validity;
  }

  return (
    <View style={styles.wrapper} testID={'signup_page1'}>
      <View style={styles.topBar}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <Text style={textStyles.formTitle}>Sign Up</Text>
      </View>
      <View style={styles.paddedContainer}>
        <View style={styles.formContainer}>
          <Text
            style={[
              textStyles.genericBoldBlackText,
              {paddingBottom: '5%', fontSize: 28},
            ]}
          >
            First a couple of details...
          </Text>
          <FormField
            title={'Email'}
            setField={setEmail}
            type={'email'}
            value={email}
            testID={'signup_email'}
          />
          <FormField
            title={'Password'}
            setField={setPassword}
            type={'password'}
            value={password}
            testID={'signup_password'}
          />
          <FormField
            title={'Confirm Password'}
            setField={setPasswordConfirmation}
            type={'password'}
            value={passwordConfirmation}
            testID={'signup_password_confirmation'}
          />
          <Text
            style={[textStyles.hyperlink]}
            onPress={() => navigation.navigate('Log In Page')}
          >
            Already have an account? Log in
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            color={'green'}
            text={'Next'}
            onPress={navigateNextPage}
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

export default SignUpPageOne;
