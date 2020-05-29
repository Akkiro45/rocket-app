import React from 'react';
import { TextInput } from 'react-native';

import getColor from '../../../util/colors';

const textInput = (props) => {
  return (
    <TextInput 
      onChangeText={props.onChangeText}
      value={props.value}
      keyboardAppearance={props.theme === 'DARK' ? 'dark' : 'light'}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      selectTextOnFocus={true}
      selectionColor={getColor('DARK').subPrimary}
      secureTextEntry={props.secureTextEntry}
      style={{
        width: '100%',
        height: 40,
        elevation: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: getColor('DARK').primary,
        borderRadius: 5,
        backgroundColor: '#fff'
      }}
    />
  );
}

export default textInput;