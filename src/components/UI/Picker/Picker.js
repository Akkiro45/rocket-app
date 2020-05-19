import React, { Component } from 'react';
import { View, ScrollView, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { Dialog } from 'react-native-simple-dialogs';

import Text from '../Text/Text';
import { DOWN_ARROW } from '../../../util/icons';

class Picker extends Component {
  state = {
    showList: false
  }
  onPressPicker = () => {
    this.setState(prevState => {
      return { showList: !prevState.showList };
    });
  }
  render() {
    return (
      <View style={{ overflow: 'hidden' }} >
        <TouchableNativeFeedback onPress={this.onPressPicker} >
          <View style={{ width: '100%', height: '100%', flexDirection: 'row' }} >
            <View style={{ width: '75%', height: '100%', justifyContent: 'center', paddingHorizontal: 10 }} >
              <Text text={this.props.item} style={{ fontSize: 18, fontFamily: 'Rubik-Light', textAlign: 'left' }} />
            </View>
            <View style={{ width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
              <Icon name={DOWN_ARROW} color={'#ccc'} size={25} />
            </View>
          </View>
        </TouchableNativeFeedback>
        <Dialog
          visible={this.state.showList}
          onTouchOutside={this.onPressPicker}
          dialogStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
          contentStyle={{ margin: 0, padding: 0, paddingVertical: 10 }}
        >
          <View style={{ maxHeight: 300 }} >
            <Text text={this.props.title ? this.props.title : 'Select'} style={{ color: '#000' }} />
            <ScrollView>
              {this.props.items.map((key, i) => {
                return (
                  <TouchableNativeFeedback key={ key + i } onPress={() => {
                    this.props.onChangePickerValue(key);
                    this.onPressPicker();
                  }} >
                    <View style={{ width: '100%', height: 40, justifyContent: 'center', paddingHorizontal: 10 }} >
                      <Text text={key} style={{ color: '#000', textAlign: 'left', fontSize: 18 }} numberOfLines={1} />
                    </View>
                  </TouchableNativeFeedback>
                );
              })}
            </ScrollView>
          </View>
        </Dialog>
      </View>
    );
  }
}

export default Picker;