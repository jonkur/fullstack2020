const initialState = {
  user: null,
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { user } = action.payload
      return { ...state, user }
    case 'SET_USERS':
      const { users } = action.payload
      return { ...state, users }
    default:
      return state
  }
}