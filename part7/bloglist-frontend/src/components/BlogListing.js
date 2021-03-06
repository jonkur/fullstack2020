import React from 'react'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'
import {
  Table,
  TableBody
} from '@material-ui/core'

const BlogListing = () => {
  const blogs = useSelector(state => state.blogReducer.blogs)

  if (!blogs) {
    return (
      <div>
        Error fetching blogs from the server.
      </div>
    )
  } else {
    return (
      <Table>
        <TableBody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <BlogCard key={blog.id} blog={blog} />
          )}
        </TableBody>
      </Table>
    )
  }
}

export default BlogListing