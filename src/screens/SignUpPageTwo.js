import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, ImageBackground, Image} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alerts} from "../static-data";
import {getCushyPaddingTop} from "../stylesheets/StyleFunction";
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";
import {launchImageLibrary} from "react-native-image-picker";
import {SignUpContext} from "../../App";
import storage from '@react-native-firebase/storage';
import firebase from "@react-native-firebase/app";

/**
 * Renders the second page of the signing up process
 */
const SignUpPageTwo = ({navigation}) => {
    const signUpContext = useContext(SignUpContext);
    const [imageUriGallery, setImageUriGallery] = useState(signUpContext.shopImageUri);
    const[imageName,setImageName]=useState(signUpContext.shopImageName);
    const [shopName, setShopName] = useState(signUpContext.shopName);
    const [shopIntro, setShopIntro] = useState(signUpContext.shopDescription);

  /**
   * Navigates to the first page and update global context values
   */
  async function navigatePreviousPage() {
    navigation.navigate('Sign Up Page One');
    signUpContext.shopName = shopName;
    signUpContext.shopDescription = shopIntro;
  }

  /**
   * Displays a confirmation message to the user in the form of an alert
   */
  const registeredMessage = () => {
    Alerts.successfulRegistration();
  };

  /**
   * Registers user to the database after checking for front end form requirements
   */
  async function registerCoffeeShop() {
    if (processErrorsFrontEnd()) {
      await auth()
        .createUserWithEmailAndPassword(
          signUpContext.email,
          signUpContext.password,
        )
        .then(() => {
          let newCoffeeShop = auth().currentUser;
          addCoffeeShop(newCoffeeShop);
          registeredMessage();
        })
        .catch(error => {
          processBackEndErrors(error.code);
        });
    }
  }

  /**
   * Checks for simple form requirements
   * @return boolean Expressing the validity of the email and password front-end wise
   */
  function processErrorsFrontEnd() {
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
  function processBackEndErrors(errorCode) {
    if (errorCode === 'auth/weak-password') {
      Alerts.weakPasswordAlert();
      navigation.navigate('Sign Up Page One');
    } else if (errorCode === 'auth/invalid-email') {
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
    await firestore()
      .collection('CoffeeShop')
      .add({
        Email: signUpContext.email,
        Name: signUpContext.shopName,
        Image:
          'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
        Intro: signUpContext.shopDescription,
        IsOpen: false,
        ItemsOffered: [],
        Location: new firestore.GeoPoint(51.503223, -0.1275), //Default location: 10 Downing Street.
      })
      .catch(errorCode => {
        if (errorCode === 'auth/network-request-failed') {
          Alerts.connectionErrorAlert();
        }
      });
  }

    const openGallery = () => {
        const options = {
            mediaType:'photo',
            includeBase64: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode)
            } else if (response.assets[0].height>response.assets[0].width) {
                Alert.alert('Image must be horizontal', 'Please only upload horizontal images.');
            } else {
                //console.log(response);
                console.log(response.assets[0].fileName);
                setImageUriGallery(response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf('/') + 1));
                setImageName(response.assets[0].fileName);
            }
        });
    };

    return (
        <View style={styles.wrapper}>
            <View  style={styles.topBar}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Text style={textStyles.formTitle}>Sign Up</Text>
            </View>
            <View style={styles.paddedContainer}>
                <View style={styles.formContainer}>
                    <Text style={[textStyles.genericBoldBlackText, {paddingBottom:'5%', fontSize: 28,}]}>Next,some information about your shop</Text>
                    <FormField
                        title={'Shop Name'}
                        setField={setShopName}
                        type={'name'}
                        value={shopName}
                    />
                    <Text style={[styles.text]}>Shop Image</Text>
                    <View style={styles.horizontalContainer}>
                        <View style={[styles.greyRectangle,styles.subImageContainerLeft]} >
                            <Text>{imageName}</Text>
                        </View>
                        <CustomButton
                            style={styles.subImageContainer}
                            color={'blue'}
                            text={'Browse'}
                            onPress={openGallery}
                            widthRatio={0.17}
                            buttonHeight={64}
                        />
                    </View>
                    <FormField
                        title={'Shop Description'}
                        setField={setShopIntro}
                        placeholder={'150 chars describing the qualities of your coffee shop'}
                        type={'multiline'}
                        value={shopIntro}
                    />
                    <Text
                        style={[ textStyles.hyperlink]}
                        onPress={() => navigation.navigate('Log In Page')}
                    >Already have an account? Log in
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
    picture: {
        borderRadius: 5,
        width: 95,
        height: 74,
        marginRight: 15,
    },
    text: {
        marginBottom: '2%',
        fontFamily: 'Roboto-Medium',
        fontSize: 27,
        color:'black',
    },

    greyRectangle: {
        backgroundColor: '#E1E1E1',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: '4.5%',
        height:58,
    },
    horizontalContainer: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: '2%',
        justifyContent:'center',
        flex:0,
    },
    subImageContainer: {
        flex: 1,
    },
    subImageContainerLeft: {
        marginRight: '3%',
        flex:1,
    },
});

export default SignUpPageTwo
