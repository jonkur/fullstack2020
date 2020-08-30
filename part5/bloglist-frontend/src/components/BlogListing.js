import React from 'react'
import Blog from './Blog'

const BlogListing = ({ user, blogs, handleAddLike, handleDeleteBlog }) => {

  return (
    blogs.sort((a, b) => b.likes > a.likes).map(blog =>
      <Blog key={blog.id} user={user} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
    )
  )
}

export default BlogListing