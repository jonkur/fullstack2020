import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_CURRENT_USER, GET_BOOKS_BY_GENRE } from '../queries'

const Recommendations = (props) => {
  const [getBooksByGenre,
    { loading: loadingBooks, error: errorBooks, data: dataBooks }] = useLazyQuery(GET_BOOKS_BY_GENRE, {
      fetchPolicy: 'cache-and-network'
    })
  const [favBooks, setFavBooks] = useState([])

  useEffect(() => {
    if (props.user) {
      getBooksByGenre({ variables: { genre: props.user.favoriteGenre } })
    }
  }, [props.user])

  useEffect(() => {
    if (dataBooks && dataBooks.allBooks) {
      setFavBooks(dataBooks.allBooks)
    }
  }, [loadingBooks, dataBooks])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre <b>{props?.user?.favoriteGenre}</b>:</p>

      { errorBooks && <p>Failed to fetch recommended books!</p>}

      { !errorBooks &&
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
            {favBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author?.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      }

    </div>
  )

}

export default Recommendations