import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogAsync } from '../actions/blogActions'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createBlog = (e) => {
    e.preventDefault()
    dispatch(addBlogAsync({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form className='newBlogForm' onSubmit={createBlog} >
        <div>
          <label>Blog title:</label>
          <input
            id='newBlogTitle'
            value={newBlogTitle}
            type='text'
            name='newBlogTitle'
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          <label>Blog author:</label>
          <input
            id='newBlogAuthor'
            value={newBlogAuthor}
            type='text'
            name='newBlogAuthor'
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          <label>Blog URL:</label>
          <input
            id='newBlogUrl'
            value={newBlogUrl}
            type='text'
            name='newBlogUrl'
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <input id='newBlogSubmit' value="Create blog" type='submit' />
      </form>
    </div>
  )
}

export default NewBlogForm