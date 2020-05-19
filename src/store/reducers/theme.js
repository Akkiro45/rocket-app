import { SET_THEME } from '../actions/actionTypes';
import getColor from '../../util/colors';

const initState = {
  ...getColor('LIGHT')
}

const reducer = (state=initState, action) => {
  switch(action.type) {
    case SET_THEME: return { ...action.colors };
    default: return state;
  }
}

export default reducer;

// import { SET_THEME } from '../actions/actionTypes';

// const initState = {
//   theme: 'LIGHT'
// }

// const reducer = (state=initState, action) => {
//   switch(action.type) {
//     case SET_THEME: return { theme: action.theme };
//     default: return state;
//   }
// }

// export default reducer;