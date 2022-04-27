import { ProfileContext } from 'context/ProfileContext'
import { useContext, useEffect, useReducer } from 'react'
import ErrorPage from 'next/error'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { Button, Container, Heading, Input, Stack } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { Footer } from '@components/Footer/Footer'
import { useInput } from 'hooks/useInput'
import { useAPI } from 'API'
import { AlertFeedback } from '@components/AlertFeedback/AlertFeedback'
import { OrderReducer } from 'reducers/expirar-orden'
import { Orden_Item } from '@components/OrdenDeCompra/Orden_Item'
import { useRouter } from 'next/router'
import Head from 'next/head'

const ExpirarOrden = () => {
  const { state } = useContext(ProfileContext)
  const router = useRouter()

  const { value, onHandleInput } = useInput()
  const { getOneOrder, UpdateOrder, getSomeOrders } = useAPI
  const [stateOrder, dispatch] = useReducer(OrderReducer.reducer, OrderReducer.initialState)
  const { onLoad, onFetching, onError, onSuccess, onUpdate } = OrderReducer.actionCreators

  const onHandleSearch = async (value: string) => {
    try {
      dispatch(onFetching())
      const resp = await getOneOrder(value)
      if (resp.error) throw new Error(resp.data)
      if (resp.data.length === 0) throw new Error('No ingresaste ningun N° de Orden')
      dispatch(onLoad(resp.data))
    } catch (error: any) {
      dispatch(onError(error.message))
    }
  }

  const onHandleClick = async (id: string, method: 'expire' | 'pay' | 'deliver' | 'payLink', value?: string) => {
    try {
      let resp: { error: boolean; data: any }
      if (method === 'payLink') {
        resp = await UpdateOrder(id, { method, link: value })
      } else {
        resp = await UpdateOrder(id, { method })
      }

      if (resp.error) throw new Error(resp.data)

      let arr = []
      for (const orden of stateOrder.orders) {
        if (orden._id === id && method === 'pay') orden.isPaid = true
        if (orden._id === id && method === 'deliver') orden.isDelivered = true
        if (orden._id === id && method === 'expire') orden.isExpired = true
        if (orden._id === id && method === 'payLink') {
          orden.isPayLink = true
          orden.payLink = value!
        }
        arr.push(orden)
      }

      dispatch(onSuccess(resp.data))

      dispatch(onUpdate(arr))
    } catch (error: any) {}
  }

  const onLoadCustom = async (param: string) => {
    try {
      dispatch(onFetching())
      const resp = await getSomeOrders(param)
      if (resp.error) throw new Error(resp.data)
      dispatch(onLoad(resp.data))
    } catch (error: any) {
      dispatch(onError(error.message))
    }
  }

  useEffect(() => {
    if (!state?.info.isAdmin) {
      router.push('/')
    } else {
      onLoadCustom('news')
    }
  }, [])

  if (!state?.info.isAdmin) return <ErrorPage statusCode={404} />
  return (
    <>
      <Head>
        <title>Can-Shop</title>
      </Head>
      <Navbar />
      <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
        <CustomContainer>
          <Stack alignItems="center">
            <Heading>ACTUALIZAR ORDEN</Heading>
          </Stack>
          <Stack direction="row">
            <Input type="text" onChange={onHandleInput} value={value} placeholder="Ingrese el N° de Orden..." />
            <Button w="max-content" onClick={() => onHandleSearch(value)}>
              Buscar
            </Button>
          </Stack>
          {stateOrder.errorFetching && <AlertFeedback opt="error" msg={stateOrder.serverMsg} />}
          {stateOrder.successFetching && <AlertFeedback opt="success" msg={stateOrder.serverMsg} />}
          <Stack direction="row" justifyContent="space-around">
            <Button colorScheme="blue" onClick={() => onLoadCustom('news')}>
              Nuevos
            </Button>
            <Button colorScheme="blue" onClick={() => onLoadCustom('topay')}>
              Marcar Pagado
            </Button>
            <Button colorScheme="blue" onClick={() => onLoadCustom('todeliver')}>
              Marcar Entregado
            </Button>
          </Stack>
          {stateOrder.orders.map((order, idx) => (
            <Orden_Item key={idx} order={order} handleClick={onHandleClick} />
          ))}
        </CustomContainer>
      </Container>
      <Footer />
    </>
  )
}

export default ExpirarOrden
