import React, { Component } from 'react';
import { ScrollView, View, FlatList, SafeAreaView, RefreshControl, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon1 from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ShareMenu from 'react-native-share-menu';

import Text from '../../components/UI/Text/Text';
import { SETTING, ADD, ROCKET, MORE_HORIZONTAL, SORT_ASC, SORT_DESC, EYE_OFF } from '../../util/icons';
import { capitalize, webLink } from '../../util/util';
import { resetError, setCurr, fetchLinks, setHide } from '../../store/actions/index'; 
import filter from '../../util/filter';
import TextInput from '../../components/UI/TextInput/TextInput';
import Picker from '../../components/UI/Picker/Picker';
import LinkCard from '../../components/LinkCard/LinkCard';

class Home extends Component {
  state = {
    refreshing: false,
    currGroup: 'All',
    showGroups: false,
    search: '',
    order: false
  }
  onChangeOrder = () => {
    this.setState(prevState => {
      return { order: !prevState.order };
    });
  }
  onRefresh = () => {
    this.props.onFetchLinks(this.props.token);
    this.setState({ refreshing: true });
  }
  onChangeText = (type, val) => {
    this.setState({ [type]: val });
  }
  onChangeGroup = (group) => {
    this.setState({ currGroup: group });
  }
  getItemCount = () => {
    return this.props.length;
  }
  componentDidMount() {
    this._unsubscribe1 = this.props.navigation.addListener('focus', () => {
      this.setState({ refreshing: false });
      this.props.onResetError();
      this.props.onSetCurr(null);
    });
    this._unsubscribe2 = this.props.navigation.addListener('blur', () => {
      this.props.onResetError();
      this.props.onSetCurr(null);
    });
    this.setState({ links: this.props.links });
    ShareMenu.getSharedText((text :string) => {
      if (text && text.length) {
        this.props.navigation.push('AddLink', { link: text });
      }
    });
    this.onRefresh();
  }
  componentWillUnmount() {
    this._unsubscribe1();
    this._unsubscribe2();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props.links !== nextProps.links || this.props.curr !== nextProps.curr) {
      this.setState({ refreshing: false });
      this.props.onResetError();
    }
  }
  render() {
    const groups = [...this.props.groups];
    groups.unshift('All');
    const hedaerComponent = (
      <View>
        <View style={{ 
          flexDirection: 'row', alignSelf: 'center',
          borderWidth: 1,
          borderColor: this.props.theme.statusBar,
          borderRadius: 5,
          borderTopWidth: 0,
          padding: 5 ,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0
        }} >
          <Text text='Visit ' type='h6' style={{ fontSize: 13 }} />
          <Text text={webLink} type='h6' style={{ fontSize: 12, color: this.props.theme.primary }} />
          <Text text=' to access links in PC!' type='h6' style={{ fontSize: 13 }} />
        </View>
        <View style={{ width: '80%', marginTop: 10, height: 40, alignSelf: 'center', borderBottomColor: '#ccc', borderBottomWidth: 2, borderRadius: 5 }} >
          <Picker 
            items={groups}
            onChangePickerValue={this.onChangeGroup}
            item={this.state.currGroup}
          />
        </View>
        <View style={{ width: '80%', alignSelf: 'center', marginVertical: 10 }} >
          <TextInput 
            onChangeText={(val) => this.onChangeText('search', val)}
            theme={this.props.theme.theme}
            value={this.state.search}
            placeholder='Search ...'
          />
        </View>
        {!this.props.hide ? (
          <TouchableOpacity onPress={() => this.props.onSetHide(true)} >
            <View style={{ flexDirection: 'row', alignSelf: 'center', color: this.props.theme.primary, borderColor: this.props.theme.primary, borderWidth: 1, borderRadius: 5, padding: 5 }} >
              <View>
                <Text text='Hide' style={{ color: this.props.theme.primary, marginRight: 10 }} />
              </View>
              <Icon Home name={EYE_OFF} color={this.props.theme.primary} size={23} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
    const footerComponent = (
      <View style={{ alignItems: 'center', marginVertical: 70 }} > 
        <Icon name={MORE_HORIZONTAL} color={this.props.theme.textColor} size={20} />
      </View>
    );
    let ren = null;
    if(this.props.links.length === 0) {
      ren = (
        <ScrollView 
        refreshControl={
          <RefreshControl 
            refreshing={this.state.refreshing} 
            onRefresh={this.onRefresh} 
            colors={[this.props.theme.primary]} />
        }>
          {hedaerComponent}
          <View style={{ marginTop: 90, alignItems: 'center', width: '80%', alignSelf: 'center' }} >
            <Icon2 name={ROCKET} color={this.props.theme.primary} size={50} />
            <Text text='Empty!' type='h4' style={{ color: this.props.theme.primary }} />
          </View>
        </ScrollView>
      );
    } else {
      ren = (
        <SafeAreaView>
          <FlatList 
            data={filter(this.props.links, this.state.currGroup, this.state.search, this.state.order, this.props.hide)}
            renderItem={(link) => <LinkCard link={link} />}
            keyExtractor={link => link._id}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing} 
                onRefresh={this.onRefresh} 
                colors={[this.props.theme.primary]} />
            }
            ListHeaderComponent={hedaerComponent}
            ListFooterComponent={footerComponent}
          />
        </SafeAreaView>
      );
    }
    if(this.props.token) {
      return (
        <View style={{ backgroundColor: this.props.theme.background, flex: 1 }} >
          <View style={{ backgroundColor: '#fff', position: "absolute", bottom: '7%', right: '14%', zIndex: 5, borderRadius: 33, elevation: 10 }} >
            <TouchableOpacity onPress={() => this.props.navigation.push('AddLink', { link: '' })} >
              <Icon1 name={ADD} color={this.props.theme.primary} size={56} />
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', height: 60, backgroundColor: this.props.theme.statusBar, flexDirection: 'row' }} >
            <View style={{ width: '70%', height: '100%', justifyContent: 'center', paddingHorizontal: 20 }} >
              <Text text={capitalize(this.props.profile.userName)} type='h4' style={{ color: '#fff', textAlign: 'left' }} numberOfLines={1} />
            </View>
            <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
              <TouchableWithoutFeedback onPress={this.onChangeOrder} >
                <Icon3 name={this.state.order ? SORT_ASC : SORT_DESC} size={30} color={'#fff'} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
              <TouchableWithoutFeedback onPress={this.props.navigation.openDrawer} >
                <Icon name={SETTING} size={30} color={'#fff'} />
              </TouchableWithoutFeedback>
            </View>
          </View>
            {ren}
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    profile: state.auth.data,
    links: state.link.links,
    groups: state.link.groups,
    token: state.auth.token,
    hide: state.link.hide,
    curr: state.link.curr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetError: () => dispatch(resetError()),
    onSetCurr: (id) => dispatch(setCurr(id)),
    onFetchLinks: (token) => dispatch(fetchLinks(token)),
    onSetHide: (hide) => dispatch(setHide(hide))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);