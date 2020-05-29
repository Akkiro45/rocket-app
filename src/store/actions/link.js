import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../../axios';
import { SET_LINKS, ADD_LINK, SET_CURR, SET_HIDE } from './actionTypes';
import { startLoading, stopLoading, setError, resetError, switchOp, errorExtractor } from './index';

export const addLink = (link) => {
  return {
    type: ADD_LINK,
    link
  }
}

export const setLinks = (links) => {
  return {
    type: SET_LINKS,
    links
  }
}

export const setCurr = (id) => {
  return {
    type: SET_CURR,
    id
  }
}

export const setHide = (hide) => {
  return {
    type: SET_HIDE,
    hide
  }
}

export const onAddLink = (token, data, navigation) => {
  return async dispatch => {
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.post('/link/add', data, { headers });
      if(response) {
        if(response.data.status === 'ok') {
          dispatch(addLink(response.data.data));
          let links = await AsyncStorage.getItem('links');
          links = JSON.parse(links);
          if(!links) {
            links = []
          }
          links.unshift(response.data.data);
          AsyncStorage.setItem('links', JSON.stringify(links));
          dispatch(stopLoading());
          navigation.pop(1);
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const onRemoveLink = (token, id, links) => {
  return async dispatch => {
    dispatch(setCurr(id));
    dispatch(resetError());
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.delete(`/link/remove/${id}`, { headers });
      if(response) {
        if(response.data.status === 'ok') {
          links = links.filter(link => link._id !== id);
          dispatch(setLinks(links));
          AsyncStorage.setItem('links', JSON.stringify(links));
          dispatch(stopLoading());
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const fetchLinks = (token, navigation) => {
  return async dispatch => {
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    try {
      const response = await axios.get('/link/?pageNumber=1&pageSize=-1', { headers });
      if(response) {
        if(response.data.status === 'ok') {
          dispatch(setLinks(response.data.data));
          AsyncStorage.setItem('links', JSON.stringify(response.data.data));
          dispatch(stopLoading());
          if(navigation) {
            navigation.navigate('Home');
            dispatch(switchOp('auth', false));
          }
        } else {
          throw new Error('Error!');
        }
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}

export const editLink = (token, id, type, value, links) => {
  return async (dispatch) => {
    dispatch(setCurr(id));
    dispatch(resetError());
    dispatch(startLoading());
    const headers = {
      'x-auth': token
    }
    const data = {
      id,
      type,
      value
    }
    try {
      const response = await axios.patch(`/link/edit`, data, { headers });
      if(response.data.status === 'ok') {
        const linkIndex = links.findIndex(link => link._id === id);
        if(linkIndex !== -1) {
          links[linkIndex][type] = value;
        }
        dispatch(setLinks(links));
        AsyncStorage.setItem('links', JSON.stringify(links));
        dispatch(stopLoading());
        dispatch(setCurr(null));
      } else {
        throw new Error('Error!');
      }
    } catch(error) {
      errorExtractor(dispatch, error);
    }
  }
}