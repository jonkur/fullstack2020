const initialState = ''

export const showNotification = notificationContent => {
    return {
        type: 'SHOW',
        data: notificationContent
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE':
            return ''
        default: return state
    }

}

export default reducer