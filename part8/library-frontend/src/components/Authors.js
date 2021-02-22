
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_AUTHORS } from '../queries.js'

const Authors = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if (data && data.allAuthors) {
      setAuthors(data.allAuthors)
    }
  }, [loading, data])

  if (!props.show) {
    return null
  }

  if (loading || error) {
    return (
      <div>
        {loading && <p>Fetching author data...</p>}
        {error && <p>Error fetching authors!</p>}
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
