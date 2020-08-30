import React, { useState, useEffect, useRef } from 'react'
import BlogListing from './components/BlogListing'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationIsVisible, setNotificationIsVisible] = useState(false)
  const [notifciationError, setNotificationError] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()
    const user = await loginService.loginUser(username, password)
    if (user) {
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setNotification(`Logged in as ${user.username}`, false, 3000)
    } else {
      setNotification('Invalid username or password', true, 3000)
    }
    setUsername('')
    setPassword('')
  }

  const logoutHandler = (e) => {
    setUser(null)
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
      setBlogs(updatedBlogs)
      setNotification('New blog entry created!', false, 3000)
    }
  }

  const handleAddLike = async (blogObj) => {
    const blog = await blogService.updateBlog(blogObj)
    if (!blog) {
      setNotification('Error adding like to blog entry!', true, 3000)
    } else {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    }
  }

  const handleDeleteBlog = async (blogObj) => {
    const res = await blogService.deleteBlog(blogObj)
    if (res && res.status === 204) {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification('Blog entry deleted.', false, 3000)
    } else {
      setNotification('Error deleting blog entry!', true, 3000)
    }
  }

  const setNotification = (message, isError, timeout) => {
    setNotificationMessage(message)
    setNotificationError(isError)
    setNotificationIsVisible(true)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationError(false)
      setNotificationIsVisible(false)
    }, timeout)
  }

  const newBlogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      {notificationIsVisible && Notification(notificationMessage, notifciationError)}
      {user === null
        ? LoginForm(loginHandler, username, setUsername, password, setPassword)
        : LogoutForm(logoutHandler, user)}
      {user &&
        <Togglable toggleButtonOpenLabel="Create blog" toggleButtonCloseLabel="Cancel" ref={newBlogFormRef} >
          <NewBlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      }
      <BlogListing user={user} blogs={blogs} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
    </div>
  )
}

export default App