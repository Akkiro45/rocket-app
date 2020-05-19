import React from 'react';
import Spinner from 'react-native-spinkit';

const spinner = (props) => {
  const options = {
    isVisible: false,
    color: props.color,
    size: 100,
    type: 'Circle',
    style: {
      alignSelf: 'center'
    },
    ...props
  }
  return (
    <Spinner 
      {...options}  
    />
  );
}

export default spinner;