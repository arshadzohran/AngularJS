import {browserHistory} from 'react-router';
import {createBrowserHistory } from 'history';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import { loadingBarReducer } from 'react-redux-loading-bar'

import appReducers from '/src/app/shared/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const router = routerMiddleware(browserHistory);

const otherReducers = {
  routing: routerReducer,
  loadingBar: loadingBarReducer,
};

export const middleware = composeEnhancers(
  applyMiddleware(thunk),
);

export const reducer = combineReducers({
  ...appReducers,
  ...otherReducers,
});

export const store = createStore(reducer, middleware);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

//export const history = syncHistoryWithStore(browserHistory, store);

export default {store, history};
