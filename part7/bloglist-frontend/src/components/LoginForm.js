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

  return (
    <div>
      <form onSubmit={loginUser}>
        Username:
        <input
          id="login-username"
          value={username}
          type='text'
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password:
        <input
          id="login-password"
          value={password}
          type='password'
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <input id="login-submit" type='submit' />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
}

export default LoginForm