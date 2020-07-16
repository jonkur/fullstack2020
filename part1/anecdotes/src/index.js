import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, label}) => (
  <button onClick={clickHandler}>{label}</button>
)

const Anecdote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>Has {votes} votes</p>
  </div>
)

const App = ({anecdotes, ...props}) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const selectRandom = () => {
    let newSelected = -1
    while (newSelected < 0 || newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newSelected)
  }

  const voteCurrent = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    if (newVotes[selected] >= newVotes[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button clickHandler={voteCurrent} label='Vote' />
      <Button clickHandler={selectRandom} label='Next anecdote' />
      <h3>Most liked anecdote</h3>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)