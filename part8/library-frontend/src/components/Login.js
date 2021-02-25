import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'

const Login = (props) => {
  const [login] = useMutation(LOGIN_USER)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ variables: { username, password } })
      if (res?.data?.login?.value) {
        const token = res.data.login.value
        props.setToken(token)
        localStorage.setItem('libUserToken', token)
        props.setPage('authors')
      }
    } catch (err) {
      setErrorMsg(err.message)
      setTimeout(() => {
        setErrorMsg('')
      }, 3000)
    }

    setUsername('')
    setPassword('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="login" />
      </form>
      { errorMsg && <p>{errorMsg}</p>}
    </div>
  )

}

export default Login