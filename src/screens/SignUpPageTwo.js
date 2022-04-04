import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../static-data';
import textStyles from '../stylesheets/textStyles';
import CustomButton from '../sub-components/CustomButton';
import {SignUpContext} from '../../App';
import {getAllItems} from '../firebase/queries';

/**
 * Renders the second page of the signing up process
 */
const SignUpPageTwo = ({navigation}) => {
  const signUpContext = useContext(SignUpContext);
  const [shopName, setShopName] = useState(signUpContext.shopName);
  const [shopIntro, setShopIntro] = useState(signUpContext.shopDescription);

  /**
   * Navigates to the first page and update global context values
   */
  async function navigatePreviousPage() {
    signUpContext.shopName = shopName;
    signUpContext.shopDescription = shopIntro;
    navigation.navigate('Sign Up Page One');
  }

  /**
   * Registers user to the database after checking for front end form requirements
   */
  async function registerCoffeeShop() {
    if (handleErrorsFrontEnd()) {
      await addCoffeeShop();
      await auth()
        .createUserWithEmailAndPassword(
          signUpContext.email,
          signUpContext.password,
        )
        .catch(error => {
          handleBackEndErrors(error.code);
        });
    }
  }

  /**
   * Checks for simple form requirements
   * @return boolean Expressing the validity of the email and password front-end wise
   */
  function handleErrorsFrontEnd() {
    let validity = true;
    if (shopName === '') {
      validity = false;
      Alerts.emptyShopName();
    } else if (shopIntro.length > 150 || shopIntro.length < 20) {
      validity = false;
      Alerts.descriptionLength();
    }
    return validity;
  }

  /**
   * Manages the response to database failure and shows
   * errors in the form of alerts to the user
   */
  function handleBackEndErrors(errorCode) {
    if (errorCode === 'auth/invalid-email') {
      Alerts.badEmailAlert();
      navigation.navigate('Sign Up Page One');
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else if (errorCode === 'auth/too-many-requests') {
      Alerts.tooManyRequestsAlert();
    }else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  /**
   * Adds all the form field values to a newly create coffee shop
   */
  async function addCoffeeShop() {
    let allItems = await getAllItems();
    await firestore()
      .collection('coffee_shops')
      .add({
        email: signUpContext.email,
        name: shopName,
        image:
          'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
        intro: shopIntro,
        is_open: false,
        items: allItems,
        location: new firestore.GeoPoint(51.503223, -0.1275), //Default location: 10 Downing Street.
      })
        .catch(() => Alerts.databaseErrorAlert());
  }

  return (
    <View style={styles.wrapper} testID={'signup_page2'}>
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
            Next, some information about your shop
          </Text>
          <FormField
            title={'Shop Name'}
            setField={setShopName}
            type={'name'}
            value={shopName}
            testID={'signup_name'}
          />
          <FormField
            title={'Shop Description'}
            setField={setShopIntro}
            placeholder={
              '150 characters describing the qualities of your coffee shop'
            }
            type={'multiline'}
            value={shopIntro}
            testID={'signup_intro'}
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
            style={[styles.leftButton]}
            color={'blue'}
            text={'Go Back'}
            onPress={navigatePreviousPage}
            widthRatio={0.42}
            buttonHeight={70}
          />
          <CustomButton
            style={styles.rightButton}
            color={'green'}
            text={'Register'}
            onPress={registerCoffeeShop}
            widthRatio={0.42}
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
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '4%',
    justifyContent: 'space-between',
  },
  leftButton: {
    flexGrow: 0,
  },
  rightButton: {
    flexGrow: 0,
  },
});

export default SignUpPageTwo;
