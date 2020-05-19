import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createDrawerNavigator } from '@react-navigation/drawer';

import { setTheme, autoSignin, setLinks } from './src/store/actions/index';

import LoadingScreen from './src/screens/Loading/Loading';
import SignupScreen from './src/screens/Signup/Signup';
import SigninScreen from './src/screens/Signin/Signin';
import HomeScreen from './src/screens/Home/Home';
import DrawerContent from './src/screens/Drawer/Drawer';
import AddLinkScreen from './src/screens/AddLink/AddLink';
import InitScreen from './src/screens/Init/Init';
import WelcomeScreen from './src/screens/Welcome/Welcome';

const AuthStack = createStackNavigator();
const authStack = () => (
  <AuthStack.Navigator headerMode='none' >
    <AuthStack.Screen name="Signin" component={SigninScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="Init" component={InitScreen} />
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} /> 
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const homeStack = () => (
  <HomeStack.Navigator headerMode='none' >
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name='AddLink' component={AddLinkScreen} />
  </HomeStack.Navigator>
);

const Drawer = createDrawerNavigator();
const drawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={homeStack} />
  </Drawer.Navigator>
);

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {
    AsyncStorage.getItem('links')
      .then(links => {
        links = JSON.parse(links);
        if(!links) links = [];
        this.props.onSetLinks(links);
      })
      .catch(() => {});
    AsyncStorage.getItem('theme')
      .then(theme => {
        if(!theme) {
          theme = 'LIGHT';
        }
        this.props.onSetTheme(theme);
      })
      .catch(() => {});
    this.props.onAutoSignin();
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <StatusBar 
          backgroundColor={this.props.theme.statusBar}
          barStyle='light-content'
        />
        <NavigationContainer>
          <Stack.Navigator headerMode='none' >
            {this.props.stacks.loading ? <Stack.Screen name="Loading" component={LoadingScreen} /> : null}
            {this.props.stacks.auth ? <Stack.Screen name="Auth" component={authStack} /> : null}
            {this.props.stacks.home ? <Stack.Screen name="Home" component={drawerNavigator} /> : null }
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
} 

const mapStateToProps = state => {
  return {
    auth: state.auth,
    stacks: state.switchNavigator,
    theme: state.theme
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSetTheme: (theme) => dispatch(setTheme(theme)),
    onAutoSignin: () => dispatch(autoSignin()),
    onSetLinks: (links) => dispatch(setLinks(links))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);