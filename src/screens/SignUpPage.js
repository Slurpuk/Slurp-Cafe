import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import FormField from '../sub-components/FormField';
import PrimaryButton from '../sub-components/PrimaryButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAvoidingView} from 'react-native';
import HorizontalBarWithText from '../sub-components/HorizontalBarWithText';

const SignUpPage = () => {
    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');


    /*
      This function provides some basic Front End validation including coffee shop name, email and password strength.
       */
    function validateRegistration() {
        const emailRegex = new RegExp(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        );

        if (name.length === 0) {
            Alert.alert('Empty Name', 'Give yor Coffee Shop a name.');
            return false;
        } else if (!emailRegex.test(email)) {
            Alert.alert('Bad Email', "That doesn't look like a valid email.");
            return false;
        } else if (password.length < 8 && password.search(/[0-9]/) < 0) {
            Alert.alert(
                'Weak Password',
                'Passwords must be 8 characters long and have a number.',
            );
            return false;
        } else if (password !== passwordConfirmation) {
            Alert.alert("Passwords Don't Match");
            return false;
        }
        return true;
    }

    /*
      Creates the authentication entry for the coffee shop account with email and password. Calls method for
      validation and clean up.
       */
    async function registerCoffeeShop() {
        if (validateRegistration()) {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    addCoffeeShop();
                    Alert.alert('Congratulations', 'Registered Successfully');
                })
                .catch(error => {
                    processBackEndErrors(error);
                });
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
                    " Fix small we make coffee that doesn't disappoint. Our hand picked roasts hit different.",
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

    /*
      This function provides a variety of error handling once received an error code from the database.
       */
    function processBackEndErrors(error) {
        if (error.code === 'auth/network-request-failed') {
            Alert.alert(
                'Network Error',
                'Make sure you are connected to the internet!',
            );
        } else if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Account Already Exists', 'You can log in above.');
        } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong Password', 'Woops! Passwords suck am I right?');
        } else if (error.code === 'auth/too-many-requests') {
            Alert.alert(
                'Too Many Requests',
                'We set a maximum limit of requests per hour for safety. ' +
                'Sorry for the inconvenience!',
            );
        } else if (error.code === 'auth/user-not-found') {
            Alert.alert(
                'Registration Error',
                'This is our bad, we made a mistake in ' +
                'registration, contact technical support. Error code #0001',
            );
        } else {
            Alert.alert(
                'Rare Error!',
                'This is a funky error! Might be a one off but please' +
                ' report it to technical support. Please quote: ' +
                error.code,
            );
        }
    }

    return (
        <View>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.signUpForm}>
                <Text style={styles.formTitle}>Sign Up</Text>
                <FormField
                    style={styles.element}
                    title={'Coffee Shop Name'}
                    placeholder={'Cool Coffee'}
                    setField={setName}
                    type={'name'}
                    value={name}
                />
                <FormField
                    style={styles.element}
                    title={'Email'}
                    placeholder={'business@coolcoffee.com'}
                    setField={setEmail}
                    type={'email'}
                    value={email}
                />
                <FormField
                    style={styles.element}
                    title={'Password'}
                    setField={setPassword}
                    type={'password'}
                    value={password}
                />
                <FormField
                    style={styles.element}
                    title={'Confirm Password'}
                    setField={setPasswordConfirmation}
                    type={'password'}
                    value={passwordConfirmation}
                />
                <View style={styles.button}>
                    <PrimaryButton
                        color={'#207671'}
                        buttonText={'Create Account'}
                        onPress={registerCoffeeShop}
                        widthRatio={0.5}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        backgroundColor: '#F2F2F2',
        padding: '5%',
        height: '100%',
    },
    signUpForm: {
        display: 'flex',
    },
    logInForm: {
        display: 'flex',
        paddingBottom: '4%',
    },
    formTitle: {
        fontSize: 40,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                paddingVertical: '4%',
            },
        }),
    },
    element: {
        display: 'flex',
    },
    button: {
        justifyContent: 'center',
        marginHorizontal: '22%',
        ...Platform.select({
            ios: {
                marginVertical: '5%',
            },
        }),
        alignContent: 'center',
    },
});

export default SignUpPage;
