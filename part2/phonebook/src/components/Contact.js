import React from 'react'

const Contact = ({person}) => (
    <div>
      <p>{person.name}, phone: {person.number}</p>
    </div>
)

export default Contact