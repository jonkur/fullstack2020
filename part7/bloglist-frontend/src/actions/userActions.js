import loginService from '../services/loginService'
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from './notificationActions'

const SET_USER = 'SET_USER'

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      user
    }
  }
}

export const loginUserAsync = (username, password) => {
  return dispatch => {
    (async () => {
      const user = await loginService.loginUser(username, password)
      if (user) {
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        dispatch(setUser(user))
        dispatch(setNotificationWithTimeout(`Logged in as ${user.username}`, false, 3000))
      } else {
        dispatch(setNotificationWithTimeout('Invalid username or password', true, 3000))
      }
    })()
  }
}

export const logoutUserAsync = () => {
  return dispatch => {
    dispatch(setUser(null))
    blogService.setToken('')
    window.localStorage.removeItem('loggedInUser')
    dispatch(setNotificationWithTimeout('You have been logged out', false, 3000))
  }
}