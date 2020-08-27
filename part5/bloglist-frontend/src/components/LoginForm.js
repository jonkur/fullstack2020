import React from 'react'

const LoginForm = (loginHandler, username, setUsername, password, setPassword) => (
    <div>
      <form onSubmit={loginHandler}>
        Username:
        <input
          value={username}
          type='text'
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        Password:
        <input
          value={password}
          type='password'
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
        <input type='submit' />
      </form>
    </div>
  )

export default LoginForm