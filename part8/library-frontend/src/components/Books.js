import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, error, data, startPolling, stopPolling, refetch } = useQuery(GET_ALL_BOOKS, {
    pollInterval: 2000
  })
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')

  // useEffect(() => {
  //   if (props.show) {
  //     startPolling(2000)
  //   } else {
  //     stopPolling()
  //   }
  // }, [props.show])

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [loading, data])

  useEffect(() => {
    const newGenres = []
    books.forEach(b => {
      b.genres.forEach(g => {
        if (!newGenres.includes(g)) {
          newGenres.push(g)
        }
      })
    })
    setGenres(newGenres)
  }, [books])

  const handleSetGenre = (g) => {
    refetch()
    setGenre(g)
  }

  if (!props.show) {
    return null
  }

  if (loading || error) {
    return (
      <div>
        { loading && <p>Loading books...</p>}
        { error && <p>Error loading books!</p>}
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      {genre &&
        <div>
          <p>Selected genre: <b>{genre}</b></p>
          <button onClick={(e) => { setGenre('') }}>Clear</button>
        </div>
      }

      <table>
        <tbody>
          <tr>
            <th style={{ minWidth: '600px', textAlign: 'left' }}>Name</th>
            <th style={{ minWidth: '200px', textAlign: 'left' }}>
              Author
            </th>
            <th style={{ minWidth: '200px', textAlign: 'left' }}>
              Published
            </th>
          </tr>
          {books.filter(b => genre === '' || b.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ maxWidth: '700px' }}>
        <h4>Select a genre:</h4>
        {genres.map(g => (
          <button onClick={(e) => { handleSetGenre(g) }} key={g}>{g}</button>
        ))}
      </div>
    </div>
  )
}

export default Books