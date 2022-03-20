import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
const FormField = ({
                       style,
                       title = 'Title',
                       placeholder = '',
                       setField,
                       value = '',
                       type = '',
                   }) => {
    let secureTextEntry = false;
    let autoCapitalize = 'none';
    let autoCorrect = true;
    let autoCompleteType = 'off';
    let keyboardType = 'default';
    let maxLength = 1235;
    let multiline = false;
    switch (type) {
        case 'name':
            autoCapitalize = 'words';
            autoCompleteType = 'name';
            break;
        case 'email':
            autoCorrect = false;
            autoCompleteType = 'email';
            break;
        case 'password':
            secureTextEntry = true;
            autoCorrect = false;
            autoCompleteType = 'password';
            break;
        case 'multiline':
            autoCapitalize = 'sentences';
            multiline = true;

    }

    return (
        <View style={style}>
            <Text style={[
                //textStyles.bluePoppinsSubHeading,
                styles.text]}>
                {title}
            </Text>
            <TextInput
                style={[styles.input, {height: multiline ? 90 : 37}]}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                onChangeText={text => setField(text)}
                autoCapitalize={autoCapitalize}
                autoCompleteType={autoCompleteType}
                autoCorrect={autoCorrect}
                keyboardType={keyboardType}
                maxLength={maxLength}
                multiline={multiline}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginBottom: '1.5%',
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
    },

    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: '3.5%',
    },
});

export default FormField;
