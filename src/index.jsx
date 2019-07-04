import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import Root from './containers/Root/Root';
import createStore from './redux/store';


const browserHistoryStore = createHistory();
const store = createStore(window._data);

ReactDOM.render(
  <Provider store={store}>
    <Root history={browserHistoryStore} />
  </Provider>, document.getElementById('root'),
);
