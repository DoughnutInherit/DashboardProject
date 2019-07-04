import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/root';

export default (data) => {
  const middleware = [];

  let _createStore;

  if (process.env.NODE_ENV === 'development') {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/devTools').default;

    _createStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
    )(createStore);
  } else {
    _createStore = applyMiddleware(...middleware)(createStore);
  }

  const store = _createStore(reducer, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers/root', () => {
      store.replaceReducer(reducer('./reducers/root'));
    });
  }

  return store;
};
