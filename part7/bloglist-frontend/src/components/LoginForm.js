import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAsync } from '../actions/userActions'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  margins: {
    marginLeft: theme.spacing(1)
  }
}))

const LoginForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (e) => {
    e.preventDefault()
    dispatch(loginUserAsync(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form className={classes.formStyle} onSubmit={loginUser}>
        <TextField
          variant='filled'
          color="secondary"
          label='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          variant='filled'
          color="secondary"
          label='Password'
          value={password}
          type='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button className={classes.margins} variant='contained' type='submit'>Login</Button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
}

export default LoginForm