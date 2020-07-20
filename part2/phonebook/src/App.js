import React, { useState } from 'react'
import NameFilter from './components/NameFilter'
import NewContactForm from './components/NewContactForm'
import ContactList from './components/ContactList'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Dummy Entry', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`Person ${newName} is already in the list!`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <NewContactForm newName={newName} 
                      newNumber={newNumber} 
                      handleSubmit={handleSubmit} 
                      handleNewName={handleNewName}
                      handleNewNumber={handleNewNumber} />
      <ContactList persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App