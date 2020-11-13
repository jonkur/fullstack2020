import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ hideTimeout, setHideTimeout }) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    clearTimeout(hideTimeout)
    dispatch(vote(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`))
    const timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
    setHideTimeout(timeout);
  }

  return (
    <>
      {anecdotes.filter(a => a.content.includes(filter)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList