import React from 'react'
import { useSelector } from 'react-redux'

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
              <td>{u.name}</td>
              <td style={tdStyle}>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users;