import React from 'react';
import {
    StyleSheet,
    StatusBar,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import HorizontalBarWithText from "../sub-components/HorizontalBarWithText";
import LoginForm from "../components/authentication/LoginForm";
import SignupForm from "../components/authentication/SignupForm";


const AuthenticationPage = () => {
    return (
        <KeyboardAvoidingView style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <LoginForm/>
            <HorizontalBarWithText text={'Or'} />
            <SignupForm/>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F2F2F2',
        padding: '5%',
    },
});

export default AuthenticationPage;
