import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogAsync, deleteBlogAsync } from '../actions/blogActions'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const [fullInfoVisible, setFullInfoVisible] = useState(false)

  const blogStyle = {
    padding: '2px 10px',
    border: '1px solid black',
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlogAsync(updatedBlog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      dispatch(deleteBlogAsync(blog))
    }
  }

  const toggleExpandBlog = () => {
    setFullInfoVisible(!fullInfoVisible)
  }

  if (fullInfoVisible) {
    return (
      <div className='blog' style={blogStyle}>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} <button className='likeButton' onClick={addLike}>Like</button></p>
        <button className='shrinkBlogButton' onClick={toggleExpandBlog}>Shrink</button>
        {user && blog.user.username === user.username &&
          <button onClick={deleteBlog}>Delete</button>
        }
      </div>
    )
  } else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button className='viewBlogButton' onClick={toggleExpandBlog}>View</button>
        {user && blog.user.username === user.username &&
          <button className='deleteBlogButton' onClick={deleteBlog}>Delete</button>
        }
      </div>
    )
  }
}

export default Blog