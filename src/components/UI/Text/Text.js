import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class TextComp extends Component {
  getFontSize = (type) => {
    if(type === 'h1') return 40;
    else if(type === 'h2') return 35;
    else if(type === 'h3') return 30;
    else if(type === 'h4') return 25;
    else if(type === 'h5') return 20;
    else if(type === 'h6') return 15;
    else return 20
  }
  style = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: this.props.theme.textColor,
      fontSize: this.getFontSize(this.props.type),
      fontFamily: 'Rubik-Regular'
    }
  });
  render() {
    return (
      <Text style={[this.style.text, this.props.style]} numberOfLines={this.props.numberOfLines} >{this.props.text}</Text>
    );
  }
}

// const getFontSize = (type) => {
//   if(type === 'h1') return 40;
//   else if(type === 'h2') return 35;
//   else if(type === 'h3') return 30;
//   else if(type === 'h4') return 25;
//   else if(type === 'h5') return 20;
//   else if(type === 'h6') return 15;
//   else return 20
// }

// const text = (props) => {
//   const style = StyleSheet.create({
//     text: {
//       textAlign: 'center',
//       color: '#000',
//       fontSize: getFontSize(props.type),
//       fontFamily: 'Rubik-Regular'
//     }
//   });
//   return (
//     <Text style={[style.text, props.style]} numberOfLines={props.numberOfLines} >{props.text}</Text>
//   );
// }

const mapStateToProps = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(TextComp);