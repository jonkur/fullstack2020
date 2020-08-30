import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [contentVisible, setContentVisible] = useState(false)

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleContentVisibility
    }
  })

  if (contentVisible) {
    return (
      <div>
        {props.children}
        <button onClick={toggleContentVisibility} >{props.toggleButtonCloseLabel}</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={toggleContentVisibility} >{props.toggleButtonOpenLabel}</button>
      </div>
    )
  }
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  toggleButtonOpenLabel: PropTypes.string.isRequired,
  toggleButtonCloseLabel: PropTypes.string.isRequired
}

export default Togglable