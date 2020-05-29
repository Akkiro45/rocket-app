import { SET_LINKS, ADD_LINK, SET_CURR, SET_HIDE } from '../actions/actionTypes';

const initState = {
  links: [],
  groups: ['None'],
  curr: null,
  hide: true
}

const reducer = (state=initState, action) => {
  switch(action.type) {
    case ADD_LINK: {  
      const links = state.links;
      links.unshift(action.link); 
      if(!state.groups.includes(action.link.group)) {
        state.groups.push(action.link.group);
      }
      return { ...state, links };
    };
    case SET_LINKS: {
      let groups = state.groups;
      action.links.forEach(link => {
        if(!groups.includes(link.group)) {
          groups.push(link.group);
        }
      });
      return { ...state, links: action.links, groups };
    };
    case SET_CURR: return { ...state, curr: action.id };
    case SET_HIDE: return { ...state, hide: action.hide };
    default: return state;
  }
} 

export default reducer;