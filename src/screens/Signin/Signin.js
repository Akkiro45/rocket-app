import React, { Component  } from 'react';
import { View, StyleSheet, Linking, KeyboardAvoidingView, TouchableNativeFeedback } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

import Text from '../../components/UI/Text/Text';
import Button from '../../components/UI/RoundedButton/RoundedButton';
import ErrorBox from '../../components/UI/ErrorBox/ErrorBox';
import ProgressBox from '../../components/UI/ProgressBox/ProgressBox';

import { webLink } from '../../util/util';
import { validateAuth } from '../../util/validation';
import { resetError, auth } from '../../store/actions/index';

class Signin extends Component {
  state = {
    userName: '',
    password: '',
    usernameError: null,
    passwordError: null
  }
  style = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: this.props.theme.background,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      height: 50,
      width: '100%',
      alignSelf: 'center',
      marginVertical: 20
    }
  });
  onChangeTextHandler = (field, value) => {
    const error = validateAuth(field, value);
    this.setState({ [field]: value, [error.type]: error.error });
  }
  onSignupPress = () => {
    this.props.navigation.replace('Signup');
  }
  onSigninPress = () => {
    if(validateAuth('userName', this.state.userName).error == null && validateAuth('password', this.state.password).error == null) {
      const data = {
        userName: this.state.userName,
        password: this.state.password
      }
      this.props.onAuth(data, true, this.props.navigation);
    }
  }
  onForgotPassword = () => {
    Linking.openURL(webLink + '/forgot/password');
  }
  render() {
    return(
      <KeyboardAvoidingView style={this.style.root} behavior='height' >
        <ProgressBox 
          visible={this.props.loading !== null ? this.props.loading : false}
          title="Signing you in"
          message="Please, wait..."
          indicatorColor={this.props.theme.primaryTextColor}
          backgroundColor={this.props.theme.background}
          textColor={this.props.theme.textColor}
        />
        <ErrorBox 
          visible={this.props.error ? true : false}
          message={this.props.error}
          onTouchOutside={this.props.onResetError}
          backgroundColor={this.props.theme.background}
          iconColor={this.props.theme.danger}
        />
        <View style={{ width: '80%' }} >
          <Text 
            text='Welcome Back!'
            type='h3'
            style={{ color: this.props.theme.primaryTextColor, textAlign: 'left', fontFamily: 'Rubik-Medium', marginBottom: 10 }}
          />
        </View>
        <View style={{ width: '100%', marginVertical: 20 }} >
          <TextField 
            label='Username'
            fontSize={18}
            characterRestriction={20}
            lineWidth={1}
            textColor={this.props.theme.theme === 'DARK' ? '#fff' : '#000'}
            tintColor={this.props.theme.primaryTextColor}
            baseColor={'#999'}
            containerStyle={{ width: '80%', alignSelf: 'center' }}
            onChangeText={(value) => this.onChangeTextHandler('userName', value)}
            error={this.state.usernameError}
          /> 
          <TextField 
            label='Password'
            secureTextEntry={true}
            fontSize={18}
            characterRestriction={60}
            lineWidth={1}
            textColor={this.props.theme.theme === 'DARK' ? '#fff' : '#000'}
            tintColor={this.props.theme.primaryTextColor}
            baseColor={'#999'}
            containerStyle={{ width: '80%', alignSelf: 'center' }}
            onChangeText={(value) => this.onChangeTextHandler('password', value)}
            error={this.state.passwordError}
          />
        </View>
        <View style={{ width: '80%' }} >
          <View style={this.style.button} >
            <Button 
              text='SIGN IN'
              onPress={this.onSigninPress}
            />
          </View>
          <TouchableNativeFeedback onPress={this.onForgotPassword} >
            <View>
              <Text 
                text='Forgot password?'
                type='h6'
                style={{ color: this.props.theme.primaryTextColor, fontWeight: 'bold', marginVertical: 10 }}
              />
            </View>
          </TouchableNativeFeedback>
          <Text 
            text={`Don't have an account?`}
            type='h6'
          />
          <TouchableNativeFeedback onPress={this.onSignupPress} >
            <View>
              <Text 
                text='Sign up'
                type='h6'
                style={{ color: this.props.theme.primaryTextColor, fontWeight: 'bold' }}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    theme: state.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetError: () => dispatch(resetError()),
    onAuth: (data, isSignin, navigation) => dispatch(auth(data, isSignin, navigation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);