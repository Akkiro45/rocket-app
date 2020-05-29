import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../../axios';
import { AUTH_SUCCESS, SIGNOUT } from './actionTypes';
import { startLoading, resetError, stopLoading, setError, resetSwitch, setLinks, setHide, errorExtractor } from './index';

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
        errorExtractor(dispatch, error);
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

export const checkPassword = (password, token) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const data = {
      password
    }
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.post('/user/check/password', data, { headers });
      if(response.data.status === 'ok') {
        dispatch(setHide(false));
        dispatch(stopLoading());
      } else {
        dispatch(stopLoading());
        dispatch(setError('Invalid password!'));
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }  
}