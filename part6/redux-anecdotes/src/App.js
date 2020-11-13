import React, { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  // Keep notification timeout state here
  const [hideTimeout, setHideTimeout] = useState(null)

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