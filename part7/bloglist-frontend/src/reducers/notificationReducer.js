const initialState = {
  notification: {
    visible: false,
    message: '',
    error: false,
    timeout: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { message, isError } = action.payload
      clearTimeout(state.notification.timeout)
      return {
        ...state,
        notification: {
          visible: true,
          message: message,
          error: isError,
          timeout: null
        }
      }
    case 'ERASE_NOTIFICATION':
      clearTimeout(state.notification.timeout)
      return {
        ...state,
        notification: {
          visible: false,
          message: '',
          error: false,
          timeout: null
        }
      }
    case 'SET_NOTIFICATION_TIMEOUT_HANDLE':
      const { timeout } = action.payload
      return {
        ...state,
        notification: {
          ...state.notification,
          timeout: timeout
        }
      }
    default:
      return state
  }
}