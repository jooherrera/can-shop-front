import { Button } from '@chakra-ui/react'

type BtnProps = {
  btnName: string
  color: string
  func: () => void
}

export const Btn = ({ btnName, color, func }: BtnProps) => {
  return (
    <Button colorScheme={color} onClick={func}>
      {btnName}
    </Button>
  )
}
