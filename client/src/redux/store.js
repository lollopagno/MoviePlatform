import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {applyMiddleware, compose, createStore} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const combineReduces = combineReducers({
    user: userReducer,
})

const middlewares = [thunk, createLogger()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

export const store = createStore(persistReducer(persistConfig, combineReduces), composeEnhancers(applyMiddleware(...middlewares)))
export const persistence = persistStore(store)

