import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(content))
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