import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleCreateBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createBlog = (e) => {
    e.preventDefault()
    handleCreateBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={createBlog} >
        <div>
          <label>Blog title:</label>
          <input
            value={newBlogTitle}
            type='text'
            name='newBlogTitle'
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          <label>Blog author:</label>
          <input
            value={newBlogAuthor}
            type='text'
            name='newBlogAuthor'
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          <label>Blog URL:</label>
          <input
            value={newBlogUrl}
            type='text'
            name='newBlogUrl'
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <input value="Create blog" type='submit' />
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default NewBlogForm