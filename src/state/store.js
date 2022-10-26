import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import app from '../reducers/app'
import login from '../reducers/login'

const reducer = combineReducers({
  app,
  login,
})

const store = configureStore({
  reducer,
})

export default store;