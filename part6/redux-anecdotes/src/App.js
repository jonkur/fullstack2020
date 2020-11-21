import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  // Keep notification timeout state here
  const [hideTimeout, setHideTimeout] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      dispatch(initAnecdotes(anecdotes))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList hideTimeout={hideTimeout} setHideTimeout={setHideTimeout} />
      <AnecdoteForm hideTimeout={hideTimeout} setHideTimeout={setHideTimeout} />
    </div>
  )
}

export default App