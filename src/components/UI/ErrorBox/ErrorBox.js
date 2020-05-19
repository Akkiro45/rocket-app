import React from 'react';
import { View } from 'react-native';
import { Dialog  } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/dist/Feather';

import Text from '../Text/Text';
import { ALERT } from '../../../util/icons';

const errorBox = (props) => {
  return (
    <Dialog 
      visible={props.visible}
      onTouchOutside={props.onTouchOutside}
      dialogStyle={{ backgroundColor: props.backgroundColor }}
    >
      <View>
        <View style={{ alignItems: 'center', marginVertical: 5 }} >
          <Icon name={ALERT} size={35} color={props.iconColor} />
        </View>
        <Text 
          text={props.message}
          type='h5'
          style={{ marginVertical: 15 }}
        />    
      </View>
    </Dialog>
  );
}

export default errorBox;