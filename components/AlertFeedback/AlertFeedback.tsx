import { Alert, AlertIcon, AlertStatus } from '@chakra-ui/react'

type AlertFeedbackProps = {
  opt: AlertStatus
  msg: string
}

export const AlertFeedback = ({ opt, msg }: AlertFeedbackProps) => {
  return (
    <Alert status={opt} mt={2}>
      <AlertIcon />
      {msg}
    </Alert>
  )
}
