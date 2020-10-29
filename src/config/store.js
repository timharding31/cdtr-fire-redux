import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from '../reducers/root';

const store = createStore(rootReducer, { firebase: 'test' }, applyMiddleware(thunk, logger));

export default store;
