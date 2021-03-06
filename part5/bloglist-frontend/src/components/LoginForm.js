import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (e) => {
    e.preventDefault()
    loginHandler(username, password)
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
  loginHandler: PropTypes.func.isRequired
}

export default LoginForm