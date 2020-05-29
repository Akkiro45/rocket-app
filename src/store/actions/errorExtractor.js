import { setError, stopLoading } from './index';

export const errorExtractor = (dispatch, error) => {
  dispatch(stopLoading());
  if(error.message === 'Network Error') {
    dispatch(setError('No Internet connection!'));
  } else if(error.response) {
    if(error.response.data.status === 'error') {
      dispatch(setError(error.response.data.error.msg));
    } else {
      dispatch(setError('Something went wrong!'));  
    }
  } else {
    dispatch(setError('Something went wrong!'));
  }
}