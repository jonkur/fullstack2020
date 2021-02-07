import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const initialState = {
  blogs: [],
  user: null,
  notificationVisible: false,
  notificationError: false,
  notificationMessage: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-NOTIFICATION':
      const { message, isError } = action.payload
      return {
        ...state,
        notificationVisible: true,
        notificationError: isError,
        notificationMessage: message
      }
    case 'ERASE-NOTIFICATION':
      return {
        ...state,
        notificationVisible: false,
        notificationError: false,
        notificationMessage: ''
      }
    case 'SET-BLOGS':
      const { blogs } = action.payload
      return { ...state, blogs }
    case 'SET-USER':
      const { user } = action.payload
      return { ...state, user }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root')
)