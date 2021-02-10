import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../actions/userActions'

const LogoutForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)

  const logoutUser = () => {
    dispatch(logoutUserAsync())
  }

  const nbPStyle = {
    display: 'inline-block',
    margin: '0px 2px'
  }

  return (
    <>
      <p style={nbPStyle} >Logged in as {user.username}</p>
      <form style={nbPStyle} onSubmit={logoutUser}>
        <input className='logoutButton' type='submit' value='log out' />
      </form>
    </>
  )
}

LogoutForm.propTypes = {
}

export default LogoutForm