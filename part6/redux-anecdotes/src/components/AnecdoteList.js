import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.showNotification(`You voted '${anecdote.content}'`, 5)
  }

  const anecdotesToShow = () => {
    if (!props.filter || props.filter === '') {
      return props.anecdotes
    }
    return props.anecdotes.filter(a => a.content.includes(props.filter))
  }

  return (
    <>
      {anecdotesToShow().map(anecdote =>
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList