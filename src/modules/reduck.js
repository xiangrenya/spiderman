import { createAction, handleActions } from 'redux-actions';

// actionTypes
export const SHOW_SPIN = 'common/SHOW_SPIN';
export const SHOW_BUTTON_SPIN = 'common/SHOW_BUTTON_SPIN';
export const SHOW_LIST_SPIN = 'common/SHOW_LIST_SPIN';

// actions
export const showSpin = createAction(SHOW_SPIN);
export const showBtnSpin = createAction(SHOW_BUTTON_SPIN);
export const showListSpin = createAction(SHOW_LIST_SPIN);

// reducer
const defaultState = {
  showSpin: { bool: false, content: '' },
  showButtonSpin: false,
  showListSpin: false,
  auths: [],
  userLogin: {},
};

const reducer = handleActions(
  {
    [showSpin]: (state, action) => ({
      ...state,
      showSpin: action.payload,
    }),
    [showBtnSpin]: (state, action) => ({
      ...state,
      showButtonSpin: action.payload.bool,
    }),
    [showListSpin]: (state, action) => ({
      ...state,
      showListSpin: action.payload.bool,
    }),
  },
  defaultState,
);

export default reducer;
