import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import app from '../reducers/app';
import profile from '../reducers/profile';
import shopVideoPreview from '../reducers/shopVideoPreview';
import location from '../reducers/location';
import department from '../reducers/department';
import device from '../reducers/device';
import chat from '../reducers/chat';
import call from '../reducers/call'


const reducer = combineReducers({
  app,
  profile,
  shopVideoPreview,
  location,
  department,
  device,
  chat,
  call,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
