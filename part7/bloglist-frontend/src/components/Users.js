import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.userReducer.users)

  const tdStyle = {
    textAlign: 'center'
  }

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(u => (
            <tr key={u.username}>
              <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
              <td style={tdStyle}>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users;