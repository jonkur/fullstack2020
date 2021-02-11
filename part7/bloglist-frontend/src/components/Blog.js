import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlogAsync, addCommentAsync } from '../actions/blogActions'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogs = useSelector(state => state.blogReducer.blogs)
  const [blog, setBlog] = useState(null)
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const blogP = blogs.find(b => b.id === id)
    if (blogP) setBlog(blogP)
  }, [blogs, id])

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlogAsync(updatedBlog))
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(addCommentAsync(blog, commentText))
    setCommentText('')
  }

  if (!blog) {
    return (
      <p>No blog found.</p>
    )
  }

  return (
    <div>
      <h4>{blog.title}</h4>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>{blog.likes} likes <button className='likeButton' onClick={addLike}>Like</button></p>
      <p>Added by {blog.user.name}</p>
      <h5>Comments</h5>
      <form onSubmit={addComment} >
        <input type='text' value={commentText} onChange={({ target }) => setCommentText(target.value)} />
        <input type='submit' value='Add comment' />
      </form>
      {blog.comments && blog.comments.length > 0 ?
        <ul>
          {blog.comments.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        : <p>This blog has not been commented yet.</p>
      }
    </div>
  )
}

export default User