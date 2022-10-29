import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import app from '../reducers/app';
import profile from '../reducers/profile';
import shopVideoPreview from '../reducers/shopVideoPreview';
import location from '../reducers/location';

const reducer = combineReducers({
  app,
  profile,
  shopVideoPreview,
  location,
});

const store = configureStore({
  reducer,
});

export default store;
