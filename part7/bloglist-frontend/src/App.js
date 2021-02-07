import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogListing from './components/BlogListing'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notificationMessage = useSelector(state => state.notificationMessage)
  const notificationError = useSelector(state => state.notificationError)
  const notificationVisible = useSelector(state => state.notificationVisible)
   // todo: look into moving most of the methods from App to child components or action creator middlewares etc.
  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      dispatch({ type: 'SET-BLOGS', payload: { blogs } })
    })()
  }, [dispatch])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch({ type: 'SET-USER', payload: { user } })
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (username, password) => {
    const user = await loginService.loginUser(username, password)
    if (user) {
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch({ type: 'SET-USER', payload: { user } })
      setNotification(`Logged in as ${user.username}`, false, 3000)
    } else {
      setNotification('Invalid username or password', true, 3000)
    }
  }

  const logoutHandler = () => {
    dispatch({ type: 'SET-USER', payload: { user: null } })
    blogService.setToken('')
    window.localStorage.removeItem('loggedInUser')
    setNotification('You have been logged out', false, 3000)
  }

  const handleCreateBlog = async (blogObj) => {
    newBlogFormRef.current.toggleContentVisibility()
    const blog = await blogService.createBlog(blogObj)
    if (!blog) {
      setNotification('Blog entry creation failed', true, 3000)
    } else {
      const updatedBlogs = await blogService.getAll()
      dispatch({ type: 'SET-BLOGS', payload: { blogs: updatedBlogs } })
      setNotification('New blog entry created!', false, 3000)
    }
  }

  const handleAddLike = async (blogObj) => {
    const blog = await blogService.updateBlog(blogObj)
    if (!blog) {
      setNotification('Error adding like to blog entry!', true, 3000)
    } else {
      const updatedBlogs = await blogService.getAll()
      dispatch({ type: 'SET-BLOGS', payload: { blogs: updatedBlogs } })
    }
  }

  const handleDeleteBlog = async (blogObj) => {
    const res = await blogService.deleteBlog(blogObj)
    if (res && res.status === 204) {
      const updatedBlogs = await blogService.getAll()
      dispatch({ type: 'SET-BLOGS', payload: { blogs: updatedBlogs } })
      setNotification('Blog entry deleted.', false, 3000)
    } else {
      setNotification('Error deleting blog entry!', true, 3000)
    }
  }

  const setNotification = (message, isError, timeout) => {
    dispatch({ type: 'SET-NOTIFICATION', payload: { message, isError } })
    setTimeout(() => { // todo: cancel timeout upon new notification
      dispatch({ type: 'ERASE-NOTIFICATION' })
    }, timeout)
  }

  const newBlogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      {notificationVisible && Notification(notificationMessage, notificationError)}
      {user === null
        ? <LoginForm loginHandler={loginHandler} />
        : <LogoutForm logoutHandler={logoutHandler} />}
      {user &&
        <Togglable toggleButtonOpenLabel="Create blog" toggleButtonCloseLabel="Cancel" ref={newBlogFormRef} >
          <NewBlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      }
      <BlogListing handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
    </div>
  )
}

export default App