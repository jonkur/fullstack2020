import React, { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import NewPersonForm from './components/NewPersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Dummy Entry', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notificationMsg, setNotificationMsg ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`Person ${newName} is already in the list. Do you want to replace the old number with this one?`)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        personService.update({...personToUpdate, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNotification(`Number for ${updatedPerson.name} was changed.`, false, 2000)
          }).catch(e => {
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
            setNotification(`Entry for ${personToUpdate.name} has been removed, cannot update.`, true, 3000)
          })
          setNewName('')
          setNewNumber('')
      }
      return
    }
    personService.create({name: newName, number: newNumber})
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNotification(`Added ${addedPerson.name}.`, false, 2000)
      })
    setNewName('')
    setNewNumber('')
  }

  const setNotification = (message, errorState, time) => {
    setNotificationMsg({msg: message, errorState: errorState})
    setTimeout(() => {
      setNotificationMsg('')
    }, time)
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

  const deleteHandler = (person) => {
    if (!window.confirm("Are you sure?")) {
      return
    }
    personService.remove(person)
      .then(person => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification(`${person.name} was removed.`, false, 2000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <Notification message={notificationMsg.msg} isError={notificationMsg.errorState} />
      <NewPersonForm newName={newName}
                     newNumber={newNumber}
                     handleSubmit={handleSubmit}
                     handleNewName={handleNewName}
                     handleNewNumber={handleNewNumber} />
      <PersonList persons={persons} nameFilter={nameFilter} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App