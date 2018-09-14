import { createStore, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../modules/reducer';

const configureStore = (history, preloadedState) => createStore(
  connectRouter(history)(rootReducer),
  preloadedState,
  applyMiddleware(thunk),
);

export default configureStore;
