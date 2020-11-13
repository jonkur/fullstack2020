import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ hideTimeout, setHideTimeout }) => {
  const dispatch = useDispatch()

  const handleAddAnecdote = e => {
    clearTimeout(hideTimeout)
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification(`Created a new anecdote '${content}'`))
    const timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
    setHideTimeout(timeout)
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