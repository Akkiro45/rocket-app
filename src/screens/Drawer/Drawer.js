import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {
  DrawerContentScrollView
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/dist/Feather';
import ToggleSwitch from 'toggle-switch-react-native';

import Text from '../../components/UI/Text/Text';
import { SIGNOUT, EYE, EYE_OFF } from '../../util/icons';
import { onSignout, setTheme, resetSwitch, setHide, resetError } from '../../store/actions/index';
import { webLink, emailID } from '../../util/util';
import PasswordChecker from '../../components/PasswordCheck/PasswordCheck';

class Drawer extends Component {
  state = {
    showPasswordChecker: false
  }
  onShowPasswordChecker = () => {
    this.props.onResetError();
    this.setState(prevState => {
      if(!prevState.showPasswordChecker) {
        this.props.navigation.closeDrawer();
      }
      return { showPasswordChecker: !prevState.showPasswordChecker };
    });
  }
  style = StyleSheet.create({
    header: {
      marginVertical: 20
    },
    divider: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: '#eee'
    },
    item: {
      // backgroundColor: 'red',
      width: '90%',
      height: 40,
      alignSelf: 'center',
      marginVertical: 5,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 10
    }
  });
  onToggle = () => {
    this.props.onSetTheme(this.props.theme.theme === 'DARK' ? 'LIGHT' : 'DARK');
    AsyncStorage.setItem('theme', this.props.theme.theme === 'DARK' ? 'LIGHT' : 'DARK');
    this.props.onResetSwitch();
  }
  render() {
    return (
      <DrawerContentScrollView style={{ backgroundColor: this.props.theme.background }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }} >
        <View>
          <PasswordChecker 
            visible={this.state.showPasswordChecker}  
            onDialodPress={this.onShowPasswordChecker} />
          <View style={this.style.header} >
            <Text text='Settings' type='h5' />
          </View>
          <View style={this.style.divider} ></View>
          <View style={this.style.item} >
            <View style={{ flexDirection: 'row' }} >
              <View style={{ width: '75%' }} >
                <Text text='Dark mode' type='h6' style={{ textAlign: 'left' }} />
              </View>
              <View style={{ width: '25%', alignItems: 'center' }} >
                <ToggleSwitch 
                  isOn={this.props.theme.theme === 'DARK' ? true : false}
                  size="small"
                  onToggle={this.onToggle}
                />
              </View>
            </View>
          </View>
          <View style={this.style.divider} ></View>
          <View style={[this.style.item, { overflow: 'hidden', paddingHorizontal: 0 }]} >
            <TouchableNativeFeedback onPress={() => {
              if(this.props.hide) {
                this.onShowPasswordChecker();
              } else {
                this.props.onSetHide(true);
                this.props.navigation.closeDrawer();
              }
            }} >
              <View style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row' }} >
                  <View style={{ width: '25%', justifyContent: 'center' }} >
                    <Icon name={this.props.hide ? EYE : EYE_OFF} color={this.props.theme.textColor} size={25} />
                  </View>
                  <View style={{ width: '75%', justifyContent: 'center' }} >
                    <Text text={this.props.hide ? 'Show hidden' : 'Hide'} type='h6' style={{ textAlign: 'left' }} />
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={this.style.divider} ></View>
          <View style={[this.style.item, { overflow: 'hidden', paddingHorizontal: 0 }]} >
            <TouchableNativeFeedback onPress={() => this.props.onSignout(this.props.token)} >
              <View style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row' }} >
                  <View style={{ width: '25%', justifyContent: 'center' }} >
                    <Icon name={SIGNOUT} color={this.props.theme.textColor} size={25} />
                  </View>
                  <View style={{ width: '75%', justifyContent: 'center' }} >
                    <Text text='Signout' type='h6' style={{ textAlign: 'left' }} />
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{ padding: 10 }} >
          <Text text={emailID} type='h6' />
          <Text text={webLink} type='h6' style={{ color: this.props.theme.primary, marginVertical: 5, fontSize: 16 }} />
        </View>
      </DrawerContentScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    theme: state.theme,
    hide: state.link.hide
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignout: (token) => dispatch(onSignout(token)),
    onSetTheme: (theme) => dispatch(setTheme(theme)),
    onResetSwitch: () => dispatch(resetSwitch()),
    onSetHide: (hide) => dispatch(setHide(hide)),
    onResetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);