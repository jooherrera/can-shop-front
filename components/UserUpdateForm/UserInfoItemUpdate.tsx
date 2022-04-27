import { IconButton, Input, Stack, Text } from '@chakra-ui/react'
import { useAPI } from 'API'
import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import { HiOutlineTrash } from 'react-icons/hi'

type UserInfoItemUpdateProps = {
  title: string
  value: string
  id: string
  authID: string
  cb: (childata: { error: boolean; success: boolean; msg: string }) => void
}

type obj = {
  [k: string]: string
}

export const UserInfoItemUpdate = ({ title, value, id, authID, cb }: UserInfoItemUpdateProps) => {
  const [input, setInput] = useState('')
  const [disabled, setDisabled] = useState(true)
  let info: obj = {}

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleDisabled = () => {
    cb({ error: false, success: false, msg: '' })
    setDisabled(false)
  }

  const handleConfirm = async () => {
    try {
      info[id] = input
      const resp = await useAPI.userUpdateAPI(info, authID)
      setDisabled(true)
      cb({ error: false, success: true, msg: resp.data })
    } catch (error: any) {
      cb({ error: true, success: false, msg: error.message })
    }
  }

  const handleCancel = () => {
    setInput('')
    setDisabled(true)
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Text>{title}:</Text>
      <Input placeholder={value} onChange={handleInput} value={input} disabled={disabled} />
      {disabled && <IconButton colorScheme="yellow" aria-label="Call Segun" size="md" icon={<GrUpdate />} onClick={handleDisabled} />}
      {!disabled && (
        <>
          <IconButton colorScheme="green" aria-label="Call Segun" size="md" icon={<AiOutlineCheck />} onClick={handleConfirm} />
          <IconButton colorScheme="red" aria-label="Call Segun" size="md" icon={<HiOutlineTrash />} onClick={handleCancel} />
        </>
      )}
    </Stack>
  )
}
