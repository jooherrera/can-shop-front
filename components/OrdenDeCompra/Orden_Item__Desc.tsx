import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { Icon, Stack, Text } from '@chakra-ui/react'
import { Order } from 'pages/mis_ordenes'

type Orden_Item__DescProps = {
  desc: Omit<Order, '_id' | 'products' | 'isExpired'>
}

export const Orden_Item__Desc = ({ desc }: Orden_Item__DescProps) => {
  return (
    <Stack direction="row" justifyContent="space-around">
      <Stack justifyContent="center" alignItems="center">
        <Text fontSize="sm" fontWeight="bold">
          SubTotal
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $ {desc.subTotal}
        </Text>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Text fontSize="sm" fontWeight="bold">
          Costo del envio
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $ {desc.shippingCost}
        </Text>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Text fontSize="sm" fontWeight="bold">
          Total
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          $ {desc.total}
        </Text>
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Text fontSize="sm" fontWeight="bold">
          Pagado
        </Text>
        {desc.isPaid ? <Icon as={AiFillCheckCircle} color="green" w={5} h={5} /> : <Icon as={AiFillCloseCircle} color="red" w={5} h={5} />}
      </Stack>

      <Stack justifyContent="center" alignItems="center">
        <Text fontSize="sm" fontWeight="bold">
          Entregado
        </Text>
        {desc.isDelivered ? <Icon as={AiFillCheckCircle} color="green" w={5} h={5} /> : <Icon as={AiFillCloseCircle} color="red" w={5} h={5} />}
      </Stack>
    </Stack>
  )
}
