import React from 'react'

const NameFilter = ({nameFilter, handleNameFilter}) => (
    <div>
      <p>Filter existing contacts:</p>
      <input value={nameFilter} onChange={handleNameFilter} />
    </div>
  )

  export default NameFilter