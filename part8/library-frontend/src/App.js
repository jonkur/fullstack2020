
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { GET_CURRENT_USER, BOOK_ADDED } from './queries'

const App = () => {
  const [getUser, { loading, data }] = useLazyQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only'
  })
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(false)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('nyt!')
      console.log(subscriptionData)
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