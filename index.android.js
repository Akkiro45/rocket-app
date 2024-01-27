import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import store from './src/store/configStore';
import Home from './src/screens/Home/Home';

const AppContainer = () => {
  return (
    <Provider store={store()} >
      <App />
    </Provider>
  );
}
AppRegistry.registerComponent('Home', () => Home);
AppRegistry.registerComponent(appName, () => AppContainer);