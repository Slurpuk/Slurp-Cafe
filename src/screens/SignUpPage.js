import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alerts} from "../static-data";
import {getCushyPaddingTop} from "../stylesheets/StyleFunction";
import textStyles from "../stylesheets/textStyles";
import CustomButton from "../sub-components/CustomButton";

const SignUpPage = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const emailRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );


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
        if (processErrorsFrontEnd()) {
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
        }
    }

    /*
 Deal with bad or empty inputs before sending request
  */
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



    /*
        Manage response to database failure
         */
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
    }
    /*
      We have already created the authentication entry but now we need to imput the values for the Coffee Shop model.
      Some of these are default, others are defined by the user input.
      WARNING: email and name must be checked to not be undefined before calling.
       */
    async function addCoffeeShop() {
        await firestore()
            .collection('CoffeeShop')
            .add({
                Email: email,
                Name: name,
                Image:
                    'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
                Intro:
                    'At ' +
                    name +
                    "  we make coffee that doesn't disappoint. Our hand picked roasts hit different.",
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



    return (
        <View style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Text style={textStyles.formTitle}>Sign Up</Text>
            <View style={styles.formContainer}>
                <FormField
                    title={'Coffee Shop Name'}
                    placeholder={'Cool Coffee'}
                    setField={setName}
                    type={'name'}
                    value={name}
                />
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
                <FormField
                    title={'Confirm Password'}
                    setField={setPasswordConfirmation}
                    type={'password'}
                    value={passwordConfirmation}
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
                    text={'Create Account'}
                    onPress={registerCoffeeShop}
                    widthRatio={0.91}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F2F2F2',
        paddingTop: getCushyPaddingTop(),
        paddingBottom: '5%',
        paddingHorizontal: '5%',
    },
    formContainer: {
        flex: 1,
        paddingVertical: '10%',
    },

    buttonContainer: {
        marginBottom: '4%',
        flex:2,
        justifyContent: 'flex-end',
    },
});

export default SignUpPage;
