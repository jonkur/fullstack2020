import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogAsync } from '../actions/blogActions'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  rootForm: {
    maxWidth: '75%',
    marginBottom: '10px'
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  upperFields: {
    flexGrow: 1,
    marginRight: '5px'
  }
}))

const NewBlogForm = () => {
  const classes = useStyles()
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
      <form className={classes.rootForm} onSubmit={createBlog} >
        <div className={classes.fieldContainer}>
          <div className={classes.upperFields} >
            <TextField
              fullWidth
              label='Blog title'
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </div>
          <div className={classes.upperFields} >
            <TextField
              fullWidth
              label='Blog author'
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </div>
          <div className={classes.upperFields} >
            <TextField
              fullWidth
              label='Blog URL'
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </div>
        </div>
        <div>
          <Button variant='contained' color="primary" type='submit' >
            Create blog
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm