import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {formField} from './stylesheets';

/**
 * Reusable from field
 */
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
      <Text style={[formField.text]}>{title}</Text>
      <TextInput
        style={[formField.input, {height: multiline ? 110 : 58}]}
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

export default FormField;
