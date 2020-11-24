import { useState } from 'react'

export const useField = (type = 'text', name = '') => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputAttrs: {
      type: 'text',
      name,
      value,
      onChange
    },
    reset
  }

}