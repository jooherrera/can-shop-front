import { useDisclosure } from '@chakra-ui/react'
import { ProfileContext } from 'context/ProfileContext'
import { useContext, useEffect } from 'react'

import { Btn } from './Btn'
import { ModalWindow } from './ModalWindow'

export const ModalFormBtn = () => {
  const { state, logOut } = useContext(ProfileContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (state?.isLogged) {
      onClose()
    }
  }, [state?.isLogged, onClose])

  return (
    <>
      {!state?.isLogged && <Btn color="blue" func={onOpen} btnName="Iniciar sesión" />}

      {state?.isLogged && <Btn color="red" func={() => logOut?.()} btnName="Cerrar sesión" />}

      <ModalWindow isOpen={isOpen} onClose={onClose} />
    </>
  )
}
