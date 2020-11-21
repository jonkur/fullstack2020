const initialState = ''
let timeout = null

export const showNotification = (notificationContent, timeInSecs) => {
  return async dispatch => {
    clearTimeout(timeout)
    const ms = timeInSecs * 1000
    dispatch({
      type: 'SHOW',
      data: notificationContent
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, ms)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return ''
    default: return state
  }

}

export default reducer