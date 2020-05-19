import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

import Text from '../Text/Text';
import getColor from '../../../util/colors';

const button = (props) => {
  return (
    <View style={{ 
      height: '100%', height: '100%', 
      borderRadius: 10, 
      overflow: 'hidden', elevation: 5,
      backgroundColor: getColor('Darek').subPrimary
    }} >
      <TouchableNativeFeedback onPress={props.onPress} >
        <View style={{ height: '100%', width: '100%', justifyContent: 'center' }} >
          <Text text={props.text} type='h5' style={{ color: '#fff' }} numberOfLines={1} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default button;