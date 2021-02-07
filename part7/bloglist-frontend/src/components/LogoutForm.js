import React from 'react'
import PropTypes from 'prop-types'

const LogoutForm = ({ logoutHandler, user }) => (
  <div>
    <p>Logged in as {user.username}</p>
    <form onSubmit={logoutHandler}>
      <input className='logoutButton' type='submit' value='log out' />
    </form>
  </div>
)

LogoutForm.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default LogoutForm