import { Button } from '@chakra-ui/react'
import { ProfileContext } from 'context/ProfileContext'
import { useContext } from 'react'

type LoginForm_ButtonProps = {
  onHandleSubmit: () => void
  onDisable: boolean
}

export const LoginForm_Button = ({ onHandleSubmit, onDisable }: LoginForm_ButtonProps) => {
  const { state } = useContext(ProfileContext)
  return (
    <>
      <Button size="lg" bg="gray.300" color="black" isLoading={state?.fetching} loadingText="Cargando" onClick={onHandleSubmit} isDisabled={onDisable}>
        Enviar
      </Button>
    </>
  )
}
