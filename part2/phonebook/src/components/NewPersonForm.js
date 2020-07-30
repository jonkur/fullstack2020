import React from 'react'

const NewPersonForm = ({newName, newNumber, handleSubmit, handleNewName, handleNewNumber}) => (
    <div>
      <h4>Add new contact:</h4>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          phone: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

  export default NewPersonForm