import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const LogoutForm = ({ logoutHandler }) => {
  const user = useSelector(state => state.user)

  return (
    <div>
      <p>Logged in as {user.username}</p>
      <form onSubmit={logoutHandler}>
        <input className='logoutButton' type='submit' value='log out' />
      </form>
    </div>
  )
}

LogoutForm.propTypes = {
  logoutHandler: PropTypes.func.isRequired
}

export default LogoutForm