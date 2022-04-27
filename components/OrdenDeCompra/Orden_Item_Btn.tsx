import { Button, Input, Stack } from '@chakra-ui/react'
import { useInput } from 'hooks/useInput'

type Orden_Item_BtnProps = {
  name: string
  color: 'red' | 'green' | 'blue'
  id: string
  method: 'expire' | 'pay' | 'deliver' | 'payLink'
  CB: (id: string, method: 'expire' | 'pay' | 'deliver' | 'payLink', value?: string) => void
}

export const Orden_Item_Btn = ({ name, color, id, method, CB }: Orden_Item_BtnProps) => {
  const { value, onHandleInput } = useInput()

  const onHandleClick = () => {
    if (method === 'payLink') {
      return CB(id, method, value)
    }
    CB(id, method)
  }

  return (
    <>
      <Button colorScheme={color} onClick={onHandleClick} disabled={method === 'payLink' && !value}>
        {name}
      </Button>

      <Stack>{method === 'payLink' && <Input variant="filled" placeholder="URL del link de pago" onChange={onHandleInput} value={value} />}</Stack>
    </>
  )
}
