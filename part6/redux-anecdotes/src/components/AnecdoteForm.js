import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = async e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification(`Created a new anecdote '${content}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote} >
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </>
  )

}

export default AnecdoteForm