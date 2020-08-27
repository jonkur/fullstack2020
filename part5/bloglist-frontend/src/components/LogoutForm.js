import React from 'react'

const LogoutForm = (logoutHandler, user) => (
  <div>
    <p>Logged in as {user.username}</p>
    <form onSubmit={logoutHandler}>
      <input type='submit' value='log out' />
    </form>
  </div>
)

export default LogoutForm