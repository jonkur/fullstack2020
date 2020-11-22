import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const handleAddAnecdote = async e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    props.addAnecdote(content)
    props.showNotification(`Created a new anecdote '${content}'`, 5)
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

const mapDispatchToProps = {
  addAnecdote,
  showNotification
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm