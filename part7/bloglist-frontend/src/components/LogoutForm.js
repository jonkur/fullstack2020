import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../actions/userActions'

const LogoutForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)

  const logoutUser = () => {
    dispatch(logoutUserAsync())
  }

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <form onSubmit={logoutUser}>
        <input className='logoutButton' type='submit' value='log out' />
      </form>
    </div>
  )
}

LogoutForm.propTypes = {
}

export default LogoutForm