import React from 'react'
import Blog from './Blog'

const BlogListing = ({ user, blogs, handleAddLike, handleDeleteBlog }) => {

  if (!blogs) {
    return (
      <div>
        Error fetching blogs from the server.
      </div>
    )
  } else {
    return (
      blogs.sort((a, b) => b.likes > a.likes).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} handleAddLike={handleAddLike} handleDeleteBlog={handleDeleteBlog} />
      )
    )
  }
}

export default BlogListing