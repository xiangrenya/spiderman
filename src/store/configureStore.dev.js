import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../modules/reducer';
import DevTools from './DevTools';

const configureStore = (history, preloadedState) => {
  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, createLogger()),
      DevTools.instrument(),
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
