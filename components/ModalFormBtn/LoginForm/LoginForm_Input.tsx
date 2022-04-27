import { FormLabel, Icon, Input } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { useInput } from '../../../hooks/useInput'

type LoginForm_InputProps = {
  label: string
  secret?: boolean
  storage?: boolean
  watchAlert?: Dispatch<SetStateAction<boolean>>
}

export const LoginForm_Input = ({ label, secret, storage, watchAlert }: LoginForm_InputProps) => {
  const { value, onHandleInput } = useInput((storage && localStorage.getItem('email')) || '')

  return {
    value,
    renderInput: (
      <>
        <FormLabel mt={4}>
          {label}
          {!value && <Icon as={BiErrorAlt} color="red" />}
        </FormLabel>
        <Input
          placeholder={label}
          onChange={(e) => {
            watchAlert?.(false)
            onHandleInput(e)
          }}
          value={value}
          type={secret ? 'password' : 'text'}
        />
      </>
    ),
  }
}
