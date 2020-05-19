import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import Text from '../../components/UI/Text/Text';
import Spinner from '../../components/UI/Spinner/Spinner';
import { tagLine } from '../../util/util';
import { ROCKET } from '../../util/icons';
import { switchOp, setTheme } from '../../store/actions/index';

class Loading extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.moveScreen(this.props.auth);
    }, 2000);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.auth) {
      if(nextProps.auth.token) {
        this.moveScreen(nextProps.auth);
      }
    }
  }

  moveScreen = (auth) => {
    this.props.onSwitchOp('home', true);
    if(auth) {
      if(auth.token) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Auth');
      }
      this.props.onSwitchOp('loading', false);
    }
  }
  style = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: this.props.theme.background,
      justifyContent: 'center'
    },
    icon: {
      alignItems: 'center'
    }
  });
  render() {
    return (
      <View style={this.style.root} >
        <View style={this.style.icon} >
          <Icon name={ROCKET} size={85} color={this.props.theme.primaryTextColor} />
        </View>
        <Text type='h1' text='Rocket' style={{ marginBottom: 40, color: this.props.theme.primaryTextColor, fontFamily: 'Rubik-Medium' }} />
        <Spinner color={this.props.theme.spinner} isVisible />
        <Text type='h5' text={tagLine} style={{ marginVertical: 30 }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchOp: (stackName, value) => dispatch(switchOp(stackName, value)),
    onSetTheme: (theme) => dispatch(setTheme(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);