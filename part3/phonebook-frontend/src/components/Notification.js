import React from 'react'

const Notification = ({message, isError}) => {
    const notificationStyle = {
        width: '40%',
        background: '#ccc',
        border: '3px solid',
        borderRadius: '10px',
        borderColor: isError ? 'red' : 'green',
        color: isError ? 'red' : 'green',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.2em'
    }

    if (!message) return null

    return (
        <div>
            <p style={notificationStyle}>{message}</p>
        </div>
    )
}

export default Notification