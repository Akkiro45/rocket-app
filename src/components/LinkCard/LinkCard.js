import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Share, Linking, ToastAndroid, TouchableNativeFeedback, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon1 from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import Clipboard from '@react-native-community/clipboard';

import { MORE_VERTICAL, DELETE, ROCKET, SHARE, CLIPBOARD, EYE_OFF, EXTERNAL_LINK } from '../../util/icons';
import { onRemoveLink, editLink } from '../../store/actions/index';
import Text from '../UI/Text/Text';

class LinkCard extends Component {
  state = {
    showDialog: false
  }
  onShare = async (link) => {
    this.setState({ showDialog: false });
    try {
      const result = await Share.share({
        message: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onOpenInBrowser = async (link) => {
    this.setState({ showDialog: false });
    try {
      const supported = await Linking.canOpenURL(link);
      if(supported) {
        await Linking.openURL(link);
      } else {
        ToastAndroid.show(`Can't open in browser!`, ToastAndroid.LONG);
      }
    } catch(e) {}
  }
  onDialodPress = () => {
    this.setState(prevState => {
      return { showDialog: !prevState.showDialog};
    });
  }
  onRemoveLink = (id) => {
    this.setState({ showDialog: false });
    this.props.onRemoveLink(this.props.token, id, this.props.links);
  }
  onCopyUrl = (link) => {
    try {
      Clipboard.setString(link);
      ToastAndroid.show('Link copied to clipboard!', ToastAndroid.LONG);
    } catch(e) {}
    this.setState({ showDialog: false });
  }
  onHide = (id) => {
    this.props.onEditLink(this.props.token, id, 'hide', true, this.props.links);
    this.setState({ showDialog: false });
  }
  style = StyleSheet.create({
    root: { 
      width: '95%', 
      backgroundColor: this.props.theme.theme === 'DARK' ? '#000' : '#fff',
      borderWidth: 1,
      borderColor: this.props.theme.primary,
      borderRadius: 10,
      alignSelf: 'center',
      overflow: 'hidden',
      elevation: 5,
      marginVertical: 10,
      zIndex: 1
    },
    header: {
      backgroundColor: this.props.theme.subPrimary,
      width: '100%',
      height: 35, 
      flexDirection: 'row'
    }
  });
  render() {
    let logo = null;
    if(this.props.link.item.logo) {
      logo = (
        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }} >
          <Image 
            source={{ uri: this.props.link.item.logo }} 
            style={{ width: '90%', height: '90%' }} 
            resizeMode='center'
          />
        </View>
      );
    } 
    let title = null;
    if(this.props.link.item.title) {
      title = (
        <View style={{ paddingHorizontal: 5, borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: 5 }} >
          <Text 
            text={this.props.link.item.title} 
            type='h6'
            style={{
              fontSize: 16,
              textAlign: 'left'
            }}
          />
        </View>
      );
    }
    let image = null;
    if(this.props.link.item.image) {
      image = (
        <View style={{ width: this.props.link.item.description ? 125 : '100%', height: 150, borderRightColor: '#ccc', borderRightWidth: this.props.link.item.description ? 1 : 0, alignItems: 'center', justifyContent: 'center' }} > 
          <Image 
            source={{ uri: this.props.link.item.image }} 
            style={{ width: '95%', height: '95%' }} 
            resizeMode='center'
          />
        </View>
      );
    }
    let description = null;
    if(this.props.link.item.description) {
      description = (
        <View style={{ width: this.props.link.item.image ? ((Dimensions.get('screen').width * 95) / 100) - 128 : '100%', padding: 7 }} >
          <Text text={'\t\t\t' + this.props.link.item.description} style={{ fontSize: 14, textAlign: 'justify', fontFamily: 'Rubik-Light' }} numberOfLines={8} />
        </View>
      );
    }
    let loading = null;
    if(this.props.loading === true && this.props.curr === this.props.link.item._id) {
      loading = (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 150, width: '100%' }} >
          <ActivityIndicator size='large' color={this.props.theme.primary} />
        </View>
      );
    }
    let error = null;
    if(this.props.error && this.props.curr === this.props.link.item._id) {
      error = (
        <View style={{ padding: 5, borderTopWidth: 1, borderColor: '#eee', width: '100%' }} >
          <Text text={this.props.error} type='h6' style={{ color: this.props.theme.danger }} numberOfLines={1} />
        </View>
      );
    }
    return (
      <View>
        <Dialog
          visible={this.state.showDialog}
          onTouchOutside={this.onDialodPress}
          dialogStyle={{ backgroundColor: this.props.theme.background, borderRadius: 5, width: '75%', alignSelf: 'center' }}
          contentStyle={{ margin: 0, padding: 0 }} >
          <View>
            <View style={{ alignItems: 'center', marginBottom: 10 }} >
              <Icon1 name={ROCKET} color={this.props.theme.primary} size={60} />
            </View>
            <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
              <TouchableNativeFeedback onPress={() => this.onShare(this.props.link.item.url)} >
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, borderTopWidth: 1, borderColor: '#ccc', borderBottomWidth: 1 }} >
                  <Text text='Share' style={{ fontSize: 18 }} />
                  <Icon2 name={SHARE} size={25} color={this.props.theme.textColor} style={{ marginHorizontal: 5 }} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
              <TouchableNativeFeedback onPress={() => this.onOpenInBrowser(this.props.link.item.url)} >
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, borderColor: '#ccc', borderBottomWidth: 1 }} >
                  <Text text='Open in Browser' style={{ fontSize: 18 }} />
                  <Icon name={EXTERNAL_LINK} size={25} color={this.props.theme.textColor} style={{ marginHorizontal: 5 }} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
              <TouchableNativeFeedback onPress={() => this.onCopyUrl(this.props.link.item.url)} >
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, borderColor: '#ccc', borderBottomWidth: 1 }} >
                  <Text text='Copy URL' style={{ fontSize: 18 }} />
                  <Icon name={CLIPBOARD} size={25} color={this.props.theme.textColor} style={{ marginHorizontal: 5 }} />
                </View>
              </TouchableNativeFeedback>
            </View>
            {this.props.link.item.hide ? null : (
              <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
                <TouchableNativeFeedback onPress={() => this.onHide(this.props.link.item._id)} >
                  <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, borderColor: '#ccc', borderBottomWidth: 1 }} >
                    <Text text='Hide' style={{ color: this.props.theme.primary, fontSize: 18 }} />
                    <Icon name={EYE_OFF} size={25} color={this.props.theme.primary} style={{ marginHorizontal: 5 }} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            ) }
            <View style={{ width: '100%', height: 40, overflow: 'hidden' }} >
              <TouchableNativeFeedback onPress={() => this.onRemoveLink(this.props.link.item._id)} >
                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                  <Text text='Delete' style={{ color: this.props.theme.danger, fontSize: 18 }} />
                  <Icon name={DELETE} size={25} color={this.props.theme.danger} style={{ marginHorizontal: 5 }} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Dialog>
        <View style={this.style.root} >
          <View style={this.style.header} >
            {logo}
            <View style={{ width: logo ? '75%' : '85%', justifyContent: 'center', paddingHorizontal: 5 }} >
              <Text text={this.props.link.item.url} type='h6' style={{ textAlign: 'left' }} numberOfLines={1} />
            </View>
            <TouchableNativeFeedback onPress={this.onDialodPress} >
              <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }} >
                  <Icon name={MORE_VERTICAL} color={this.props.theme.textColor} size={25} />
              </View>
            </TouchableNativeFeedback>
          </View>
          {title}
          <View style={{ width: '100%', flexDirection: 'row' }} >
            {loading ? loading : image}
            {loading ? null : description}
          </View>
          {error}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    error: state.error.error,
    curr: state.link.curr,
    theme: state.theme,
    token: state.auth.token,
    links: state.link.links
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveLink: (token, id, links) => dispatch(onRemoveLink(token, id, links)),
    onEditLink: (token, id, type, value, links) => dispatch(editLink(token, id, type, value, links))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkCard);