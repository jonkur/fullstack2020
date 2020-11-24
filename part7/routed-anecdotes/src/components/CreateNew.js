import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

export default (props) => {
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputAttrs.value,
      author: author.inputAttrs.value,
      info: info.inputAttrs.value,
      votes: 0
    })
    history.push('/')
  }

  const resetFields = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
            <input {...content.inputAttrs} />
        </div>
        <div>
          author
            <input {...author.inputAttrs} />
        </div>
        <div>
          url for more info
            <input {...info.inputAttrs} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}