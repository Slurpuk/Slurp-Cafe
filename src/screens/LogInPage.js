import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import FormField from '../sub-components/FormField';
import PrimaryButton from '../sub-components/PrimaryButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LogInPage = () => {
    const [emailLogIn, setEmailLogIn] = useState('');
    const [passwordLogIn, setPasswordLogIn] = useState('');


    /*
    Before attempting authentication, this function checks if there is a coffee shop registered with
    the input email. If there is, but authentication fails, the only alternative is they entered an
    incorrect password and an Alert will show.
     */
    async function authenticateCoffeeShop() {
        let foundCoffeeShop = false;

        await firestore()
            .collection('CoffeeShop')
            .get()
            .then(coffeeShops => {
                coffeeShops.forEach(shop => {
                    if (shop.data().Email === emailLogIn) {
                        foundCoffeeShop = true;
                    }
                });
            })
            .catch(function (error) {
                console.log(
                    'There has been a problem with your fetch operation: ' +
                    error.message,
                );
                throw error;
            });

        if (foundCoffeeShop) {
            await auth()
                .signInWithEmailAndPassword(emailLogIn, passwordLogIn)
                .catch(error => processBackEndErrors(error));
        } else {
            Alert.alert(
                'Coffee Shop Not Registered',
                'Are you new or did you make a typo in the email?',
                [{text: 'Dismiss'}],
            );
        }
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
        }
        else if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong Password', 'Woops! It seems your password is not correct');
        } else if (error.code === 'auth/too-many-requests') {
            Alert.alert(
                'Too Many Requests',
                'We set a maximum limit of requests per hour for safety. ' +
                'Sorry for the inconvenience!',
            );
        }
         else {
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
            <View style={styles.logInForm}>
                <Text style={styles.formTitle}>Log In</Text>
                <FormField
                    style={styles.element}
                    title={'Email'}
                    placeholder={'business@coolcoffee.com'}
                    setField={setEmailLogIn}
                    type={'email'}
                    value={emailLogIn}
                />
                <FormField
                    style={styles.element}
                    title={'Password'}
                    setField={setPasswordLogIn}
                    type={'password'}
                    value={passwordLogIn}
                />
                <View style={styles.button}>
                    <PrimaryButton
                        color={'#207671'}
                        buttonText={'Log In'}
                        onPress={authenticateCoffeeShop}
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

export default LogInPage;
