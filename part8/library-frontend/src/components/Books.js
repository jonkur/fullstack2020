import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [loading, data])

  if (!props.show) {
    return null
  }

  if (loading || error) {
    return (
      <div>
        { loading && <p>Loading books...</p> }
        { error && <p>Error loading books!</p> }
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books