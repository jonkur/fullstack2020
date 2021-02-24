import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NEW_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const [createBook] = useMutation(ADD_NEW_BOOK, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }, { query: GET_ALL_BOOKS }]
  })
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const pubInt = parseInt(published)
    try {
      await createBook({ variables: { title, author, published: pubInt, genres } })
    } catch (err) {
      setError(err.message)
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default NewBook