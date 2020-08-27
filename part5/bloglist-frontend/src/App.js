import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
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

  const newBlogHandler = async (e) => {
    e.preventDefault()
    const blogObj = { title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }
    const blog = await blogService.createBlog(blogObj)
    if (!blog) {
      setNotification('Blog entry creation failed', true, 3000)
    } else {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification('New blog entry created!', false, 3000)
    }
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
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

  return (
    <div>
      <h2>blogs</h2>
      {notificationIsVisible && Notification(notificationMessage, notifciationError)}
      {user === null
        ? LoginForm(loginHandler, username, setUsername, password, setPassword)
        : LogoutForm(logoutHandler, user)}
      {user && NewBlogForm(newBlogHandler, newBlogTitle, setNewBlogTitle,
        newBlogAuthor, setNewBlogAuthor, newBlogUrl, setNewBlogUrl)}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App