import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { ModalForm_BtnGroup } from './BtnGroup/ModalForm_BtnGroup'
import { LoginForm } from './LoginForm/LoginForm'
import { RegisterForm_UI } from './RegisterForm/RegisterForm'

type ModalWindowProps = {
  isOpen: boolean
  onClose: () => void
}

export const ModalWindow = ({ isOpen, onClose }: ModalWindowProps) => {
  const { state: btnClicked, render: renderBtnGroup } = ModalForm_BtnGroup()

  const initialRef = useRef<HTMLInputElement>(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Stack my={4}>
            <Text>Seleccionar formulario</Text>
          </Stack>
          {renderBtnGroup}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{btnClicked.R ? <RegisterForm_UI /> : <LoginForm />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
