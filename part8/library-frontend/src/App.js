
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { GET_CURRENT_USER, BOOK_ADDED, GET_ALL_BOOKS } from './queries'

const App = () => {
  const [getUser, { loading, data }] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only'
  })
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(false)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInstore = client.readQuery({ query: GET_ALL_BOOKS })
    if (!includedIn(dataInstore.allBooks, addedBook)) {
      client.writeQuery({
        query: GET_ALL_BOOKS,
        data: { allBooks : dataInstore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token])

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me)
    }
  }, [loading, data])

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('libUserToken')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user && <button onClick={() => setPage('add')}>add book</button>}
        {!user && <button onClick={() => setPage('login')}>login</button>}
        {user && <button onClick={() => setPage('recommend')}>recommend</button>}
        {user && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommend'}
        user={user}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App