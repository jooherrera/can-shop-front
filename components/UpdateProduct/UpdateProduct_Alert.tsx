import { Alert, AlertIcon, AlertStatus } from '@chakra-ui/react'

type UpdateProduct_AlertProps = {
  opt: AlertStatus
  msg: string
}

export const UpdateProduct_Alert = ({ opt, msg }: UpdateProduct_AlertProps) => {
  return (
    <Alert status={opt}>
      <AlertIcon />
      {msg}
    </Alert>
  )
}
