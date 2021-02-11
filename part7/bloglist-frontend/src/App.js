import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import NavBar from './components/NavBar'
import BlogListing from './components/BlogListing'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogService'
import { setUser } from './actions/userActions'
import { fetchAllBlogsAsync } from './actions/blogActions'
import { fetchAllUsersAsync } from './actions/userActions'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const notification = useSelector(state => state.notificationReducer.notification)

  useEffect(() => {
    dispatch(fetchAllBlogsAsync())
    dispatch(fetchAllUsersAsync())
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const newBlogFormRef = useRef()

  return (
    <Router>
      <div>
        <NavBar />
        {notification.visible && Notification(notification.message, notification.error)}
        <h2>Blogs</h2>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users' >
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path="/blogs" >
            {user &&
              <Togglable toggleButtonOpenLabel="Create blog" toggleButtonCloseLabel="Cancel" ref={newBlogFormRef} >
                <NewBlogForm />
              </Togglable>
            }
            <BlogListing />
          </Route>
          <Route exact path='/' >
            <Redirect to='/blogs' />
          </Route>
          <Route path='*' >
            <p>404 - Nothing here...</p>
          </Route>
        </Switch>
      </div>
    </Router >
  )
}

export default App