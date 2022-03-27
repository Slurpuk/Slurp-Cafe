import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import CustomButton from '../sub-components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {CustomAlerts} from '../sub-components/Alerts';

const SignUpPage = ({navigation}) => {
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_confirmation, setPasswordConfirmation] = useState();

    function resetPasswordFields() {
        setPassword('');
        setPasswordConfirmation('');
    }

    const warningPassword = () => {
        Alert.alert(
            'Warning!',
            'Password should be same as password confirmation!',
            [
                {
                    text: 'OK',
                },
            ],
        );
    };

    // Display a confirmation message to the user
    const registeredMessage = () => {
        Alert.alert('Congratulations', 'Registered Successfully', [
            {
                text: 'OK',
            },
        ]);
    };

    // Register the user to the database after checking their credentials
    async function registerUser() {
        if (password === password_confirmation) {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let newUser = auth().currentUser;
                    addUser(newUser);
                    registeredMessage();
                })
                .catch(error => {
                    processBackEndErrors(error);
                });
        } else {
            warningPassword();
            resetPasswordFields();
        }
    }

    async function addUser(user) {
        await firestore()
            .collection('Users')
            .add({
                Email: email,
                FirstName: first_name,
                LastName: last_name,
                authID: user.uid,
                Basket: [],
                TotalPrice: 0,
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
                CustomAlerts.NO_NETWORK.title,
                CustomAlerts.NO_NETWORK.message,
            );
        } else if (error.code === 'auth/email-already-in-use') {
            //Do something else
        } else if (error.code === 'auth/too-many-requests') {
            Alert.alert(
                CustomAlerts.MANY_REQUESTS.title,
                CustomAlerts.MANY_REQUESTS.message,
            );
        } else {
            Alert.alert(CustomAlerts.ELSE.title, CustomAlerts.ELSE.message);
        }
    }

    return (
        <View style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Text style={[textStyles.blueJosefinHeading]}>Sign Up</Text>
            <View style={styles.formContainer}>
                <View style={styles.namesContainer}>
                    <FormField
                        style={[styles.subNameContainer, styles.subNameContainerLeft]}
                        title={'First Name'}
                        placeholder={'Jane'}
                        setField={setFirstName}
                        type={'name'}
                        value={first_name}
                    />
                    <FormField
                        style={[styles.subNameContainer]}
                        title={'Last Name'}
                        placeholder={'Doe'}
                        setField={setLastName}
                        type={'name'}
                        value={last_name}
                    />
                </View>
                <FormField
                    style={styles.element}
                    title={'Email'}
                    placeholder={'janedoe@gmail.com'}
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
                    value={password_confirmation}
                />
                <Text
                    style={[textStyles.bluePoppinsBody, styles.hyperlink]}
                    onPress={() => navigation.navigate('LogIn')}>
                    Already have an account? Log in
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    text={'Create Account'}
                    onPress={registerUser}
                    priority={'primary'}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#EDEBE7',
        paddingTop: getCushyPaddingTop(),
        paddingBottom: '5%',
        paddingHorizontal: '5%',
    },
    formContainer: {
        flex: 1,
        paddingTop: '5%',
    },

    namesContainer: {
        flexDirection: 'row',
        display: 'flex',
        paddingVertical: '2%',
    },
    subNameContainer: {
        flex: 1,
    },
    subNameContainerLeft: {
        marginRight: '5%',
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '4%',
    },
    hyperlink: {
        marginVertical: '2%',
        textDecorationLine: 'underline',
        textAlignVertical: 'bottom',
    },
});

export default SignUpPage;
