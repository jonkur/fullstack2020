import { combineReducers } from 'redux'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

export default combineReducers({
  blogReducer,
  notificationReducer,
  userReducer
})