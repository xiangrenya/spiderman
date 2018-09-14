import { createAction, handleAction } from 'redux-actions';
import { push } from 'connected-react-router';
import { message } from 'antd';
import { fetcherWithLoading } from '../../utils/fetch';
import storage from '../../utils/storage';
import { SHOW_BUTTON_SPIN } from '../reduck';
import apis from '../apis';

// actions
export const loginAction = createAction('user/LOGIN');

export const userLogin = arg => dispatch => fetcherWithLoading(dispatch, SHOW_BUTTON_SPIN)('post', apis.login, arg).then(
  (res) => {
    if (res.code !== 0) {
      message.error(res.errmsg);
    } else {
      dispatch(loginAction(res.data));
      dispatch(push('/'));
    }
  },
);

// reducer
const defaultState = {
  userLogin: {},
};

const reducer = handleAction(
  loginAction,
  (state, action) => {
    storage.set('userInfo', action.payload);
    return {
      ...state,
      userLogin: action.payload,
    };
  },
  defaultState,
);

export default reducer;
