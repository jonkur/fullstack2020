import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAsync } from '../actions/userActions'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (e) => {
    e.preventDefault()
    dispatch(loginUserAsync(username, password))
    setUsername('')
    setPassword('')
  }

  const nbPStyle = {
    display: 'inline-block',
    margin: '0px 2px'
  }

  return (
    <>
      <form style={nbPStyle} onSubmit={loginUser}>
        Username:
        <input style={nbPStyle}
          id="login-username"
          value={username}
          type='text'
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password:
        <input style={nbPStyle}
          id="login-password"
          value={password}
          type='password'
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <input id="login-submit" type='submit' />
      </form>
    </>
  )
}

LoginForm.propTypes = {
}

export default LoginForm