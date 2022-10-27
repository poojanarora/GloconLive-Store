import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import app from '../reducers/app';
import profile from '../reducers/profile';

const reducer = combineReducers({
  app,
  profile,
});

const store = configureStore({
  reducer,
});

export default store;
