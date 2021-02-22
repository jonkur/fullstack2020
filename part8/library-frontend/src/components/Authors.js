
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_AUTHORS, CHANGE_AUTHOR_AGE } from '../queries'

const Authors = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS)
  const [changeAuthorAge] = useMutation(CHANGE_AUTHOR_AGE)
  const [authors, setAuthors] = useState([])
  const [cfName, setCfName] = useState('')
  const [cfYear, setCfYear] = useState('')

  useEffect(() => {
    if (data && data.allAuthors) {
      setAuthors(data.allAuthors)
    }
  }, [loading, data])

  const changeBirthYear = (e) => {
    e.preventDefault()

    changeAuthorAge({ variables: { name: cfName, born: parseInt(cfYear) } })

    setCfName('')
    setCfYear('')
  }

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

      <h2>Set birthyear</h2>
      <form onSubmit={changeBirthYear} >
        <p>name:
        <input type="text" value={cfName} onChange={(e) => setCfName(e.target.value)} /></p>
        <p>born:
        <input type="number" step="1" value={cfYear} onChange={(e) => setCfYear(e.target.value)} /></p>
        <input type="submit" value="Update author" />
      </form>

    </div>
  )
}

export default Authors
