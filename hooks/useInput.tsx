import React, { useState } from 'react'

export const useInput = (str: string = '') => {
  const [value, setValue] = useState(str)

  const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onHandleInput,
  }
}
