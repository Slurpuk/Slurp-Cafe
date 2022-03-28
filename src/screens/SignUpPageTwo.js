import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, ImageBackground, Image} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alerts} from "../static-data";
import {getCushyPaddingTop} from "../stylesheets/StyleFunction";
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";
import {launchImageLibrary} from "react-native-image-picker";
import {SignUpContext} from "./SignUpPageOne";

const SignUpPageTwo = ({navigation}) => {
    const [imageUriGallery, setImageUriGallery] = useState('');
    const signUpOneContext = useContext(SignUpContext);
    const [shopName, setShopName] = useState('');
    const [shopIntro, setShopIntro] = useState('');


    // Display a confirmation message to the user
    const registeredMessage = () => {
        Alert.alert('Congratulations', 'Registered Successfully', [
            {
                text: 'OK',
            },
        ]);
    };


    // Register the user to the database after checking their credentials
    async function registerCoffeeShop() {
        /*if (processErrorsFrontEnd()) {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let newCoffeeShop = auth().currentUser;
                    addCoffeeShop(newCoffeeShop);
                    registeredMessage();
                })
                .catch(error => {
                    processBackEndErrors(error.code);
                });
        }*/

        await auth()
            .createUserWithEmailAndPassword(signUpOneContext.email, signUpOneContext.password)
            .then(() => {
                let newCoffeeShop = auth().currentUser;
                addCoffeeShop(newCoffeeShop);
                registeredMessage();
            });
    }

/*    /!*
 Deal with bad or empty inputs before sending request
  *!/
    function processErrorsFrontEnd() {
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
        } else if (passwordConfirmation === '') {
            validity = false;
            Alert.alert('Empty Password Confirmation', 'Please enter the password confirmation.');
        } else if (password!==passwordConfirmation) {
            validity = false;
            Alert.alert('Password dont match up', 'Please make sure you password confirmation is the same as you password.');
        }

        return validity;
    }



    /!*
        Manage response to database failure
         *!/
    function processBackEndErrors(errorCode) {
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
    }*/
    /*
      We have already created the authentication entry but now we need to imput the values for the Coffee Shop model.
      Some of these are default, others are defined by the user input.
      WARNING: email and name must be checked to not be undefined before calling.
       */
    async function addCoffeeShop() {
        await firestore()
            .collection('CoffeeShop')
            .add({
                Email: signUpOneContext.email,
                Name: shopName,
                //will be an actual image
                Image:
                    'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
                Intro: shopIntro,
                IsOpen: false,
                ItemsOffered: [],
                Location: new firestore.GeoPoint(51.503223, -0.1275), //Default location: 10 Downing Street.
                Likeness: 69,
                Queue: 42,
            })
            .catch(error => {
                console.log(error);
            });
    }

    const openGallery = () => {
        const options = {
            mediaType:'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, response => {
            setImageUriGallery(response.assets[0].uri);
        });
    };


    return (
        <View style={styles.wrapper}>
            <View  style={styles.topBar}>
                <StatusBar translucent={true} backgroundColor="white" />
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
                    <FormField
                        title={'Shop Description'}
                        setField={setShopIntro}
                        placeholder={'100 chars describing the qualities of your coffee shop'}
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
                        color={'green'}
                        text={'Next'}
                        onPress={registerCoffeeShop}
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
        width:'100%',
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
        paddingTop: getCushyPaddingTop(),
        paddingBottom: '5%',
    },
    formContainer: {
        flex: 1,
        paddingVertical: '10%',
    },
    paddedContainer: {
        display:"flex",
        flex:1,
        paddingHorizontal: '5%',
    },

    buttonContainer: {
        marginBottom: '4%',
        flex:2,
        justifyContent: 'flex-end',
    },
    picture: {
        borderRadius: 5,
        width: 95,
        height: 74,
        marginRight: 15,
    },
});

export default SignUpPageTwo
