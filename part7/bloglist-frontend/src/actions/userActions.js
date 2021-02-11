import loginService from '../services/loginService'
import blogService from '../services/blogService'
import userService from '../services/userService'
import { setNotificationWithTimeout } from './notificationActions'

const SET_USER = 'SET_USER'
const SET_USERS = 'SET_USERS'

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      user
    }
  }
}

export const setUsers = users => {
  return {
    type: SET_USERS,
    payload: {
      users
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

export const fetchAllUsersAsync = () => {
  return dispatch => {
    (async () => {
      try {
        const users = await userService.getAll()
        dispatch(setUsers(users))
      } catch (err) {
        dispatch(setNotificationWithTimeout('Error fetching users from the server.', true, 3000))
      }
    })()
  }
}