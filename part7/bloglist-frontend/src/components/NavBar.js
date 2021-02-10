import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'

const NavBar = () => {
  const user = useSelector(state => state.userReducer.user)

  const nbContStyle = {
    backgroundColor: '#bbb',
    padding: '7px'
  }

  const nbPStyle = {
    display: 'inline-block',
    margin: '0px 2px'
  }

  return (
    <div style={nbContStyle} >
      <Link to="/blogs" ><p style={nbPStyle}>Blogs</p></Link>
      <Link to="/users" ><p style={nbPStyle}>Users</p></Link>
      {user === null
        ? <LoginForm />
        : <LogoutForm />}
    </div>
  )

}

export default NavBar