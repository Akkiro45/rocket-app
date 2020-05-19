import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../../axios';
import { AUTH_SUCCESS, SIGNOUT } from './actionTypes';
import { startLoading, resetError, stopLoading, setError, resetSwitch, setLinks } from './index';

export const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    data
  }
}

export const signout = () => {
  return {
    type: SIGNOUT,
  }
}

export const onSignout = (token) => {
  return dispatch => {
    try {
      AsyncStorage.multiRemove(['auth', 'theme', 'links']);
    } catch(e) {}
    const headers = {
      'x-auth': token
    }
    axios.delete('/user/signout', { headers })
      .then(() => {
        console.log('Signout');
      })
      .catch(() => {
        console.log('Not Signout');
      });
      dispatch(resetSwitch());
      dispatch(setLinks([]));
      dispatch(signout());
      dispatch(resetError());
  }
}

export const auth = (data, isSignin, navigation) => {
  return dispatch => {
    dispatch(startLoading());
    const URL = isSignin ? '/user/signin' : '/user/signup';
    axios.post(URL, data)
      .then(res => {
        const data = {
          token: res.headers['x-auth'],
          data: res.data.data
        }
        dispatch(authSuccess(data));
        dispatch(stopLoading());
        AsyncStorage.setItem('auth', JSON.stringify(data));
        if(isSignin) {
          navigation.replace('Init');
        } else {
          navigation.replace('Welcome');
        }
      })
      .catch(error => {
        dispatch(stopLoading());
        if(error.response) {
          if(error.response.data.status === 'error') {
            dispatch(setError(error.response.data.error.msg));
          }
        } else {
          dispatch(setError('Something went wrong!'));
        }
      });
  }
}

export const autoSignin = () => {
  return dispatch => {
    AsyncStorage.getItem('auth')
    .then(auth => {
      if(auth) {
        auth = JSON.parse(auth);
        if(auth.data && auth.token) {
          dispatch(authSuccess(auth));
        }
      }
    })
    .catch(e => {
      dispatch(signout());
    });
  }
}