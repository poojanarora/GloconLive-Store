import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import app from '../reducers/app';
import profile from '../reducers/profile';
import shopVideoPreview from '../reducers/shopVideoPreview';
import location from '../reducers/location';
import department from '../reducers/department';

const reducer = combineReducers({
  app,
  profile,
  shopVideoPreview,
  location,
  department,
});

const store = configureStore({
  reducer,
});

export default store;
