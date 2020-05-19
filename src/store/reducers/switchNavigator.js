import { SWITCH_OP, RESET_SWITCH } from '../actions/actionTypes';

const initState = {
  loading: true,
  auth: true,
  home: true
}

const reducer = (state=initState, action) => {
  switch(action.type) {
    case SWITCH_OP: return { ...state, [action.stackName]: action.value };
    case RESET_SWITCH: return { ...state, ...initState, home: false};
    default: return state;
  }
} 

export default reducer;