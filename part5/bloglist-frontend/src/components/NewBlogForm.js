import React from 'react'

const NewBlogForm = (newBlogHandler, newBlogTitle, setNewBlogTitle,
  newBlogAuthor, setNewBlogAuthor, newBlogUrl, setNewBlogUrl) => (
    <div>
      <form onSubmit={newBlogHandler} >
        Blog title:
        <input
          value={newBlogTitle}
          type='text'
          name='newBlogTitle'
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
        Blog author:
        <input
          value={newBlogAuthor}
          type='text'
          name='newBlogAuthor'
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
        Blog URL:
        <input
          value={newBlogUrl}
          type='text'
          name='newBlogUrl'
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  )

export default NewBlogForm