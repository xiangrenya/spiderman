import { createAction, handleActions } from 'redux-actions'

// actions
export const increment = createAction('home/INCREMENT')
export const decrement = createAction('home/DECREMENT')

// reducer
const defaultState = {
  counter: 0
}

const reducer = handleActions(
  {
    [increment]: state => ({ ...state, counter: state.counter + 1 }),
    [decrement]: state => ({ ...state, counter: state.counter - 1 }),
  },
  defaultState,
)

export default reducer
