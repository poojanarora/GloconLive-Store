import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import app from '../reducers/app'
import login from '../reducers/login'
import shopVideoPreview from '../reducers/shopVideoPreview'

const reducer = combineReducers({
  app,
  login,
  shopVideoPreview,
})

const store = configureStore({
  reducer,
})

export default store;