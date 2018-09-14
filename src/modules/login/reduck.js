import { createAction, handleAction } from 'redux-actions'
import { push } from 'connected-react-router'
import { message } from 'antd'
import { fetcherWithLoading } from 'Utils/fetch'
import storage from 'Utils/storage'
import apis from '../apis'
import { SHOW_BUTTON_SPIN } from 'Modules/reduck'

// actions
export const login = createAction('user/LOGIN')

export const userLogin = arg => dispatch =>
  fetcherWithLoading(dispatch, SHOW_BUTTON_SPIN)('post', apis.login, arg).then(
    res => {
      if (res.code !== 0) {
        message.error(res.errmsg)
      } else {
        dispatch(login(res.data))
        dispatch(push('/'))
      }
    }
  )

// reducer
const defaultState = {
  userLogin: {}
}

const reducer = handleAction(
  login,
  (state, action) => {
    storage.set('userInfo', action.payload)
    return {
      ...state,
      userLogin: action.payload
    }
  },
  defaultState
)

export default reducer
