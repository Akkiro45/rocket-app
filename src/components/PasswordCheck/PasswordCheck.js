import React, { Component } from 'react';
import { View, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import { connect } from 'react-redux';

import Text from '../UI/Text/Text';
import Input from '../UI/TextInput/TextInput';
import { checkPassword, resetError } from '../../store/actions/index';

class PasswordCheck extends Component {
  state = {
    password: ''
  }
  onChangeText = (val) => {
    this.setState({ password: val });
    if(this.props.error) {
      this.props.onResetError();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.hide === false && this.state.password !== '') {
      this.props.onDialodPress();
      this.setState({ password: '' });
    }
  }
  render() {
    let ren = null;
    ren = (
      <View style={{ width: '80%', alignSelf: 'center', height: 40, marginVertical: 10 }} >
        <Input 
          placeholder='Password'
          onChangeText={this.onChangeText}
          value={this.state.password}
          maxLength={60}
          secureTextEntry
        />
      </View>
    );
    if(this.props.loading) {
      ren = (
        <ActivityIndicator size='large' color={this.props.theme.primary} />
      );
    }
    let error = null;
    if(this.props.error) {
      error = (
        <Text text={this.props.error} type='h6' style={{ color: this.props.theme.danger }} />
      );
    }
    return (
      <Dialog
        visible={this.props.visible}
        onTouchOutside={this.props.onDialodPress}
        dialogStyle={{ backgroundColor: '#fff', borderRadius: 5, width: '90%', alignSelf: 'center' }}
        contentStyle={{ margin: 0, padding: 0 }} >
        <View>
          <Text text='Enter Password' style={{ fontFamily: 'Rubik-Medium', color: '#000' }} />
          <View style={{ marginVertical: 20 }} >
            {ren}
            {error}
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 40, justifyContent: 'center', borderTopColor: '#eee', borderTopWidth: 1 }} >
            <TouchableNativeFeedback onPress={this.props.onDialodPress} >
              <View style={{ width: '49%', height: '100%', justifyContent: 'center', borderRightColor: '#eee', borderRightWidth: 1 }} >
                <Text text='Cancel' style={{ color: '#000' }} />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
              this.props.onResetError();
              this.props.onCheckPasssword(this.state.password, this.props.token)
            }} >
              <View style={{ width: '49%', height: '100%', justifyContent: 'center' }} >
              <Text text='Show' style={{ color: this.props.theme.primary }} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    token: state.auth.token,
    theme: state.theme,
    hide: state.link.hide
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckPasssword: (password, token) => dispatch(checkPassword(password, token)),
    onResetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordCheck);