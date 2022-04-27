import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

type AlertWindowProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  msg: string
  CB?: () => void
}

export const AlertWindow = ({ isOpen, onClose, title, msg, CB }: AlertWindowProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const onHandleClick = () => {
    onClose()
    CB?.()
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{msg}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onHandleClick} colorScheme="blue" ml={3}>
              Aceptar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
