import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    StatusBar,
} from 'react-native';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../App';

const SignUpPage = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password_confirmation, setPasswordConfirmation] = useState();

    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
    };

    const resetFLEFields = () => {
        setPassword('');
        setPasswordConfirmation('');
    };

    const switchToLogIn = () => {
        navigation.navigate('LogIn');
    };

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

    const warningUserAlreadyExists = () => {
        Alert.alert('Warning!', 'This email already exists', [
            {
                text: 'OK',
            },
        ]);
    };

    // Display a confirmation message to the user
    const registeredMessage = () => {
        Alert.alert('Congratulations', 'Registered Successfully', [
            {
                text: 'OK',
            },
        ]);
        resetFields();
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
                    if (error.code === 'auth/email-already-in-use') {
                        warningUserAlreadyExists();
                    }
                })
                .catch(re => {
                    console.log(re);
                });
        } else {
            warningPassword();
            resetFLEFields();
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
            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <CustomButton
                        text={'Create Account'}
                        onPress={registerUser}
                        priority={'primary'}
                        style={styles.button}
                    />
                </View>
                <View>
                    <Text
                        style={[textStyles.bluePoppinsBody, styles.hyperlink]}
                        onPress={switchToLogIn}
                    >
                        Already have an account? Log in
                    </Text>
                </View>
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
        paddingHorizontal: '5%',
    },
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        paddingTop: '3%',
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

    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '4%',
    },
    button: {
        marginVertical: '2%',
    },
    hyperlink: {
        marginVertical: '2%',
        textAlign: 'center',
        textDecorationLine: 'underline',
        textAlignVertical: 'bottom',
    },
});

export default SignUpPage;
