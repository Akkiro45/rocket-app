import React from 'react';
import { ProgressDialog } from 'react-native-simple-dialogs';

const progressBox = (props) => {
  return (
    <ProgressDialog
      visible={props.visible}
      title={props.title}
      message={props.message}
      activityIndicatorColor={props.indicatorColor}
      activityIndicatorSize='large'
      messageStyle={{ fontFamily: 'Rubik-Regular' }}
      dialogStyle={{ backgroundColor: props.backgroundColor }}
      titleStyle={{ color: props.textColor }}
      messageStyle={{ color: 'grey' }}
    />
  );
}

export default progressBox;