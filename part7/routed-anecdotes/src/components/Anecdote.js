import React from 'react'

export default ({ anecdote }) => {
  if (!anecdote) {
    return (
      <div>
        No such anecdote!
      </div>
    )
  }

  return (
    <div>
      <h4>{anecdote.content}</h4>
      <ul>
        <li>by: {anecdote.author}</li>
        <li>{anecdote.info}</li>
        <li>votes: {anecdote.votes}</li>
      </ul>
    </div>
  )
}