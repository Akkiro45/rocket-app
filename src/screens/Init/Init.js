import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Spinner from 'react-native-spinkit';

import Text from '../../components/UI/Text/Text';
import { ROCKET, ALERT } from '../../util/icons';
import { fetchLinks, resetError } from '../../store/actions/index';
import Button from '../../components/UI/RoundedButton/RoundedButton';

class Init extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.onFetchLinks(this.props.token, this.props.navigation);
    }, 1000);
  }
  render() {
    let ren = null;
    if(this.props.error) {
      ren = (
        <View style={{ alignItems: 'center' }} >
          <Icon1 name={ALERT} size={60} color={'#fff'} style={{ marginVertical: 30 }} />
          <Text text={this.props.error} type='h5' style={{ color: '#fff' }} />
          <View style={{ width: 150, height: 40, marginTop: 30 }} >
            <Button text='Retry' onPress={this.props.onResetError} />
          </View>
        </View>
      );
    } else {
      ren = (
        <View style={{ alignItems: 'center' }} >
          <Icon name={ROCKET} size={90} color={'#eee'} />
          <Text text='Fetching links' type='h3' style={{ color: '#fff', marginVertical: 10 }} />
          <Text text='Wait a moment' style={{ color: '#fff', marginVertical: 25, marginTop: 50 }} />
          <Spinner isVisible={true} color='#fff' size={60} type='ThreeBounce' />
        </View>
      );
    }
    return (
      <LinearGradient colors={[this.props.theme.statusBar, this.props.theme.primary, this.props.theme.subPrimary]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        {ren}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    token: state.auth.token,
    error: state.error.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchLinks: (token, navigation) => dispatch(fetchLinks(token, navigation)),
    onResetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Init);