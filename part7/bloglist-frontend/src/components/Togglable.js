import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

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
        <Button variant='contained' onClick={toggleContentVisibility} >{props.toggleButtonCloseLabel}</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button variant='contained' onClick={toggleContentVisibility} >{props.toggleButtonOpenLabel}</Button>
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