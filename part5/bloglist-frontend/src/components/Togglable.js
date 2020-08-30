import React, { useState, useImperativeHandle } from 'react'

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

export default Togglable