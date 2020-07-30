import React from 'react'
import Person from './Person'

const PersonList = ({persons, nameFilter, deleteHandler}) => (
    <div>
        <h4>Numbers</h4>
        <div>
          {persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler} />)}
        </div>
    </div>
  )

  export default PersonList