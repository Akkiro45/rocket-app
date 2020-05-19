import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import Text from '../../components/UI/Text/Text';
import Button from '../../components/UI/RoundedButton/RoundedButton';
import getColors from '../../util/colors';
import { webLink, tagLine } from '../../util/util'
import { ROCKET } from '../../util/icons';
import { switchOp } from '../../store/actions/index';

class Welcome extends Component {
  render() {
    return (
      <LinearGradient colors={[getColors('DARK').statusBar, getColors('DARK').primary, getColors('DARK').subPrimary]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ width: '80%', alignItems: 'center' }} >
          <Icon name={ROCKET} color={'#fff'} size={90} />
          <Text text={'Rocket'} type='h3' style={{ color: '#fff', marginBottom: 80 }} />
          <Text text={`Visit`} type='h5' style={{ color: '#fff' }} />
          <Text text={webLink} type='h5' style={{ color: getColors('DARK').linkColor, borderBottomWidth: 1, borderBottomColor: getColors('DARK').linkColor }} />
          <Text text={`to access links in PC!`} type='h5' style={{ color: '#fff' }} />
          <Text text={tagLine} type='h6' style={{ color: '#fff', marginTop: 50, fontSize: 18 }} />
        </View>
        <View style={{ width: '80%', height: 45, position: 'absolute', bottom: 30 }} >
          <Button text='Get Started' onPress={() => {
            this.props.navigation.navigate('Home');
            this.props.onSwitchOp('auth', false);
          }} />
        </View>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchOp: (stackName, value) => dispatch(switchOp(stackName, value))
  }
}

export default connect(null, mapDispatchToProps)(Welcome);