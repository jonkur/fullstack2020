import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogListing = ({ handleAddLike, handleDeleteBlog }) => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs) {
    return (
      <div>
        Error fetching blogs from the server.
      </div>
    )
  } else {
    return (
      blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
      )
    )
  }
}

export default BlogListing