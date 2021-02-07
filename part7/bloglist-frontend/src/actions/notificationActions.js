const SET_NOTIFICATION = 'SET_NOTIFICATION'
const ERASE_NOTIFICATION = 'ERASE_NOTIFICATION'
const SET_NOTIFICATION_TIMEOUT_HANDLE = 'SET_NOTIFICATION_TIMEOUT_HANDLE'

const setNotification = (message, isError) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      isError
    }
  }
}

const eraseNotification = () => {
  return {
    type: ERASE_NOTIFICATION
  }
}

const setNotificationTimeoutHandle = timeoutHandle => {
  return {
    type: SET_NOTIFICATION_TIMEOUT_HANDLE,
    payload: {
      timeout: timeoutHandle
    }
  }
}

export const setNotificationWithTimeout = (message, isError, timeout) => {
  return dispatch => {
    dispatch(setNotification(message, isError))
    const timeoutHandle = setTimeout(() => {
      dispatch(eraseNotification())
    }, timeout)
    dispatch(setNotificationTimeoutHandle(timeoutHandle))
  }
}