/* import { redux, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import rootReducer from './reducers/combine';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;  */

var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var reducers = require('./reducers');

var store = createStore(reducers.repositoryReducer, applyMiddleware(thunk));
module.exports  = store;
