import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon1 from 'react-native-vector-icons/dist/Ionicons';
import Clipboard from '@react-native-community/clipboard';

import { LEFT_ARROW, ROCKET, ALERT } from '../../util/icons';
import { isEmty } from '../../util/util';
import { onAddLink, resetError, stopLoading } from '../../store/actions/index';
import Text from '../../components/UI/Text/Text';
import TextInput from '../../components/UI/TextInput/TextInput';
import Picker from '../../components/UI/Picker/Picker';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class AddLink extends Component {
  state = {
    currGroup: 'None', 
    link: '',
    group: '',
    error: null
  }
  onChangePickerValue = (val) => {
    this.setState({ currGroup: val, error: null });
  }
  onChangeText = (type, val) => {
    this.setState({ [type]: val, error: null });
  }
  onPressAdd = () => {
    if(isEmty(this.state.link)) {
      this.setState({ error: 'Please enter link!' });
    } else if(this.state.currGroup === 'Add New' && isEmty(this.state.group)) {
      this.setState({ error: 'Plasea enter group name!' });
    } else {
      const data = {
        url: this.state.link,
        group: this.state.currGroup === 'Add New' ? this.state.group : this.state.currGroup
      }
      this.props.onAddLink(this.props.token, data, this.props.navigation);
    }
  }
  componentDidMount() {
    this.props.onStopLoading();
    if(this.props.route.params.link) {
      this.setState({ link: this.props.route.params.link });
    } else {
      Clipboard.getString()
        .then(link => {
          this.setState({ link });
        })
        .catch(() => {});
    }
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('Add New');
    let grp = (
      <View style={{ flexDirection: 'row', height: 40 }} >
        <View style={{ width: '30%', paddingHorizontal: 10, height: '100%', justifyContent: 'center' }} >
          <Text text='Tag :' numberOfLines={1} style={{ textAlign: 'left' }} />
        </View>
        <View style={{ width: '69%', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }} >
          <Picker 
            items={groups}
            onChangePickerValue={this.onChangePickerValue}
            item={this.state.currGroup}
          />
        </View>
      </View>
    );
    if(this.state.currGroup === 'Add New') {
      grp = (
        <TextInput 
          placeholder='Tag name'
          maxLength={60}
          onChangeText={(val) => this.onChangeText('group', val)}
          value={this.state.group}  
        />
      );
    }
    let ren = (
      <KeyboardAvoidingView behavior='padding' style={{ height: Dimensions.get('window').height - 80 }} >
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
          <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }} >
            <Icon1 name={ROCKET} color={this.props.theme.primary} size={110} />
          </View>
          <View style={{ flex: 1.5, width: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ width: '80%', marginVertical: 10 }} >
              <TextInput 
                placeholder='Paste link here'
                onChangeText={(val) => this.onChangeText('link', val)}
                value={this.state.link}  
              />
            </View>
            <View style={{ width: '80%', marginVertical: 10 }} >
              {grp}
            </View>
            <TouchableOpacity onPress={() => { this.setState({ currGroup: 'None', group: '', link: '' }) }} >
              <Text text='Reset' type='h6' style={{ fontSize: 16, color: this.props.theme.subPrimary, marginVertical: 10 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} > 
            <Text text={this.state.error} type='h6' style={{ color: this.props.theme.primary, marginBottom: 10, fontSize: 17 }} numberOfLines={1} />
            <View style={{ width: '60%', height: 40 }} >
              <Button text='Add' onPress={this.onPressAdd} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
    if(this.props.loading) {
      ren = (
        <View style={{ height: Dimensions.get('window').height - 80, justifyContent: 'center' }} >
          <Spinner color={this.props.theme.spinner} isVisible />
        </View>
      );
    } else if(this.props.error) {
      ren = (
        <View style={{ height: Dimensions.get('window').height - 80, justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center' }} >
          <Icon name={ALERT} size={60} color={this.props.theme.primary} style={{ marginVertical: 10 }} />
          <Text text={this.props.error} type='h5' style={{ color: this.props.theme.primary }} />
          <View style={{ width: 150, height: 40, marginTop: 30 }} >
            <Button text='Retry' onPress={this.props.onResetError} />
          </View>
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: this.props.theme.background, flex: 1 }} >
        <View style={{ width: '100%', height: 60, backgroundColor: this.props.theme.statusBar, flexDirection: 'row' }} >
          <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <TouchableWithoutFeedback onPress={() => this.props.navigation.pop(1)} >
              <Icon name={LEFT_ARROW} size={30} color={'#fff'} />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ width: '80%', height: '100%', justifyContent: 'center', paddingHorizontal: 20 }} >
            <Text text={'Add Link'} type='h4' style={{ color: '#fff', textAlign: 'left' }} numberOfLines={1} />
          </View>
        </View>
        {ren}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    loading: state.loading.loading,
    error: state.error.error,
    token: state.auth.token,
    groups: state.link.groups
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLink: (token, data, navigation) => dispatch(onAddLink(token, data, navigation)),
    onResetError: () => dispatch(resetError()),
    onStopLoading: () => dispatch(stopLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLink);