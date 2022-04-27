import { Button } from '@chakra-ui/react'

type ModalForm_BtnProps = {
  btnName: string
  cb: (child: { R: boolean; L: boolean }) => void
  state: boolean
  color: string
}

export const ModalForm_Btn = ({ btnName, cb, state, color }: ModalForm_BtnProps) => {
  const onHandleClick = () => {
    if (btnName === 'Register') {
      cb({ R: true, L: false })
    } else {
      cb({ R: false, L: true })
    }
  }

  return (
    <>
      <Button colorScheme={color} mr={3} onClick={onHandleClick} variant={state ? 'solid' : 'outline'} _focus={{ border: 'none' }}>
        {btnName}
      </Button>
    </>
  )
}
