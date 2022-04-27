import { useContext } from 'react'
import { IShadows } from '@styles/theme'
import { Badge, Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { Orden_Item__Product } from './Orden_Item__Product'
import { Orden_Item__Desc } from './Orden_Item__Desc'
import { Order } from 'pages/mis_ordenes'
import { Orden_Item_Btn } from './Orden_Item_Btn'
import { ProfileContext } from 'context/ProfileContext'

type Orden_ItemProps = {
  order: Order

  handleClick?: (id: string, method: 'expire' | 'pay' | 'deliver' | 'payLink', value?: string) => void
}

export const Orden_Item = ({ order, handleClick }: Orden_ItemProps) => {
  const { state } = useContext(ProfileContext)
  const { _id, products, isExpired, ...rest } = order
  return (
    <>
      <Stack boxShadow={IShadows.shadoItem} p={2} bg="gray.200">
        <Stack direction="row">
          <Heading size="xs">ORDEN N° {_id}</Heading>
          {isExpired && (
            <Badge variant="solid" colorScheme="red">
              Vencido
            </Badge>
          )}
        </Stack>
        {products.map((prod, idx) => (
          <Orden_Item__Product key={idx} prod={prod} />
        ))}
        <Orden_Item__Desc desc={rest} />
        {state?.info.isAdmin && (
          <>
            <Stack direction="row" justifyContent="space-around">
              {!order.isPaid && !order.isExpired && <Orden_Item_Btn name="Expirar" color="red" id={_id} method="expire" CB={handleClick!} />}
              {!order.isExpired && !order.isPaid && order.isPayLink && <Orden_Item_Btn name="Pagado" color="green" id={_id} method="pay" CB={handleClick!} />}
              {order.isPaid && !order.isDelivered && <Orden_Item_Btn name="Entregado" color="blue" id={_id} method="deliver" CB={handleClick!} />}
            </Stack>
            <Stack>
              {!order.isPayLink && !order.isExpired && <Orden_Item_Btn name="Generar Link de pago" color="blue" id={_id} method="payLink" CB={handleClick!} />}
              <Text>Nombre : {order.name}</Text>
              <Text>Apellido : {order.lastName}</Text>
              <Text>Telefono : {order.phone}</Text>
              {order.isPayLink && <Text>Link de pago : {order.payLink}</Text>}
            </Stack>
          </>
        )}
        {!state?.info.isAdmin && order.isPayLink && !order.isPaid && !order.isExpired && (
          <Button colorScheme="blue">
            <Link href={order.payLink} isExternal w="full">
              Pagar
            </Link>
          </Button>
        )}
      </Stack>
    </>
  )
}
