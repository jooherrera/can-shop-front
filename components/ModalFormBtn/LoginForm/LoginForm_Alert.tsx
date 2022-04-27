import { Alert, AlertIcon, AlertStatus } from '@chakra-ui/react'

type LoginForm_AlertProps = {
  opt: AlertStatus
  msg: string
}

export const LoginForm_Alert = ({ opt, msg }: LoginForm_AlertProps) => {
  return (
    <Alert status={opt}>
      <AlertIcon />
      {msg}
    </Alert>
  )
}
