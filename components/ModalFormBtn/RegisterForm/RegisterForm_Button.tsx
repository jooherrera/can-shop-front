import { Button } from '@chakra-ui/react'

type LoginForm_ButtonProps = {
  status: boolean
  onHandleSubmit: () => void
  isDisabled: () => boolean
}

export const RegisterForm_Button = ({ status, onHandleSubmit, isDisabled }: LoginForm_ButtonProps) => {
  return (
    <>
      <Button size="lg" bg="gray.300" color="black" isLoading={status} loadingText="Cargando" onClick={onHandleSubmit} isDisabled={isDisabled()}>
        Enviar
      </Button>
    </>
  )
}
