import { FormLabel, Icon, Input } from '@chakra-ui/react'
import { useInput } from 'hooks/useInput'
import { BiErrorAlt } from 'react-icons/bi'

type RegisterForm_Input = {
  title: string
}

export const RegisterForm_Input = ({ title }: RegisterForm_Input) => {
  const { value, onHandleInput } = useInput()

  return {
    value,
    render: (
      <>
        <FormLabel mt={4}>
          {title} {!value && <Icon as={BiErrorAlt} color="red" />}
        </FormLabel>
        <Input placeholder={title} onChange={onHandleInput} value={value} />
      </>
    ),
  }
}
