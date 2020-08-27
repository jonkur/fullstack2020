import React from 'react'

const Notification = (notificationMessage, notifciationError) => (
  <div style={{ display: 'inline-block', padding: '2px 40px', background: notifciationError ? '#f55' : '#99c', border: '2px solid #888', borderRadius: '15px' }}>
    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{notificationMessage}</p>
  </div>
)

export default Notification