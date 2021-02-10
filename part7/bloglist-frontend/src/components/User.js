import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.userReducer.users)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userP = users.find(u => u.id === id)
    if (userP) setUser(userP)
  }, [users, id])

  if (!user) {
    return (
      <p>No user found.</p>
    )
  }

  return (
    <div>
      <h4>{user.name}</h4>
      <h2>Added blogs:</h2>
      {user.blogs.length === 0 && (
        <p>This user has not blogged yet.</p>
      )}
      <ul>
        {user.blogs.map(b => (
          <li key={b.title}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User