import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import DevTools from './store/DevTools';
import MainRouter from './modules/router';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <MainRouter history={history} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
