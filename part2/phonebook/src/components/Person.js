import React from 'react'

const Contact = ({person, deleteHandler}) => (
    <div>
      <p>{person.name}, phone: {person.number} <button onClick={() => deleteHandler(person)}>delete</button></p>
    </div>
)

export default Contact