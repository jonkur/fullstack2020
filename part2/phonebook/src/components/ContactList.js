import React from 'react'
import Contact from './Contact'

const ContactList = ({persons, nameFilter}) => (
    <div>
        <h4>Numbers</h4>
        <div>
          {persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .map(person => <Contact key={person.name} person={person} />)}
        </div>
    </div>
  )

  export default ContactList