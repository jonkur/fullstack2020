import anecdoteService from '../services/anecdotes'

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => {
        return anecdote.id === action.data.id
          ? action.data
          : anecdote
      }).sort((a1, a2) => a1.votes < a2.votes)
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer