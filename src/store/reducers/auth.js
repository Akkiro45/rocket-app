import { AUTH_SUCCESS, SIGNOUT } from '../actions/actionTypes';

const initState = {
  token: null,
  data: null
};

const reducer = (state=initState, action) => {
  switch(action.type) {
    case AUTH_SUCCESS: return {...state, ...action.data};
    case SIGNOUT: return {...state, token: null, data: null };
    default: return state;
  }
}

export default reducer;