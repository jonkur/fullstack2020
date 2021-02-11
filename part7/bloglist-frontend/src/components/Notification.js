import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const Notification = (notificationMessage, notifciationError) => (
  <div>
    <Alert severity={notifciationError ? 'error' : 'success'} >
      {notificationMessage}
    </Alert>
  </div>
  // <div style={{ display: 'inline-block', padding: '2px 40px', background: notifciationError ? '#f55' : '#99c', border: '2px solid #888', borderRadius: '15px' }}>
  //   <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{notificationMessage}</p>
  // </div>
)

Notification.propTypes = {
  notificationMessage: PropTypes.string.isRequired,
  notifciationError: PropTypes.bool.isRequired
}

export default Notification