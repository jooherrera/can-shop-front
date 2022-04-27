import { Container, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { Footer } from '@components/Footer/Footer'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { Orden_Item } from '@components/OrdenDeCompra/Orden_Item'
import { useAPI } from 'API'
import { ProfileContext } from 'context/ProfileContext'
import { useContext, useEffect, useState } from 'react'
import ErrorPage from 'next/error'
import { AlertWindow } from '@components/AlertWindow/AlertWindow'
import Head from 'next/head'

export type Product = {
  id: string
  name: string
  price: number
  quantity: number
  imageFile: string
}

export type Order = {
  _id: string
  products: Product[]
  subTotal: number
  shippingCost: number
  total: number
  isPaid: boolean
  isDelivered: boolean
  isExpired: boolean
  name: string
  lastName: string
  phone: string
  isPayLink: boolean
  payLink: string
}

const MisOrdenes = () => {
  const { state, logOut } = useContext(ProfileContext)
  const [orders, setOrders] = useState<Order[] | []>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onLoad = async () => {
    try {
      const resp = await useAPI.getOrders()
      if (resp.error) throw new Error('Error en el back')
      setOrders(resp.data)
    } catch (error: any) {
      onOpen()
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      {state?.isLogged ? (
        <>
          <Head>
            <title>Can-Shop</title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Head>
          <Navbar />
          <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
            <CustomContainer>
              <Stack alignItems="center">
                <Heading>ORDENES DE COMPRA</Heading>
              </Stack>
              {orders.map((order, idx) => (
                <Orden_Item key={idx} order={order} />
              ))}
            </CustomContainer>
          </Container>
          <Footer />
          <AlertWindow isOpen={isOpen} onClose={onClose} title="Alerta!" msg="Sesión expirada. Haga login de nuevo." CB={logOut} />
        </>
      ) : (
        <ErrorPage statusCode={404} />
      )}
    </>
  )
}

export default MisOrdenes
