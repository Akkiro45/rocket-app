import { SET_THEME } from './actionTypes';
import getColors from '../../util/colors';

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    colors: getColors(theme)
  }
}