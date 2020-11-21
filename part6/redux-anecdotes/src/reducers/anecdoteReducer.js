
export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = data => {
  return {
    type: 'ADD',
    data
  }
}

export const initAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => {
        return anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      }).sort((a1, a2) => a1.votes < a2.votes)
    case 'ADD':
      return [ ...state, action.data ]
    case 'INIT':
      return action.data
    default:
      return state 
  }
}

export default reducer