import { Button, Container, FormControl, FormLabel, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { Item } from '@components/Cart/Item'
import { CustomContainer } from '@components/CustomContainer'
import { Footer } from '@components/Footer/Footer'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { ProductInCart, useAPI } from 'API'
import { NextPage } from 'next'
import { useContext, useEffect, useReducer, useState } from 'react'
import { Switch } from '@chakra-ui/react'
import { ProfileContext } from 'context/ProfileContext'
import ErrorPage from 'next/error'
import { CartReducer } from 'reducers/cart'
import { AlertWindow } from '@components/AlertWindow/AlertWindow'
import { AlertFeedback } from '@components/AlertFeedback/AlertFeedback'
import Head from 'next/head'

const Cart: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure()

  const { state, logOut } = useContext(ProfileContext)
  const [stateCart, dispatch] = useReducer(CartReducer.reducer, CartReducer.initialState)
  const { setLoad, setSubTotal, setShippingCost, setTotal, setIsShipping } = CartReducer.actionCreator
  const { fetchProductsFromCart } = useAPI

  const [alert, setAlert] = useState({ title: '', msg: '' })
  const [sinStock, setSinStock] = useState(false)

  const onRemoveItem = async (id: string) => {
    const resp = await useAPI.removeProductFromCart(id)
    if (resp.error) throw new Error(resp.data)
    setSinStock(false)
    onLoad()
  }

  const onLoad = async () => {
    try {
      const resp = await fetchProductsFromCart()
      if (resp.error) throw new Error(resp.data)
      dispatch(setLoad(resp.data.products))

      if (resp.data.products) {
        for (const prod of resp.data.products) {
          if (!prod.available) {
            setSinStock(true)
          }
        }
        const subT = resp.data.products.reduce((acc: number, el: ProductInCart) => {
          return (acc += el.price)
        }, 0)
        dispatch(setShippingCost(resp.data.shippingCost))
        dispatch(setSubTotal(subT))
        dispatch(setTotal())
      }
    } catch (error) {
      onOpenError()
    }
  }

  const onEnvioChange = () => {
    dispatch(setIsShipping(!stateCart.isShipping))
    dispatch(setTotal())
  }

  const onGenerateOrder = async () => {
    try {
      const resp = await useAPI.generateOrder(stateCart.isShipping)
      if (resp.error) throw new Error(resp.data)

      setAlert({ title: 'Orden generada!', msg: `Pronto generaremos el link de pago. Podrá verlo en la sección "Mis Ordenes" ` })
      onOpen()
      onLoad()
    } catch (error: any) {
      setAlert({ title: 'Generar Orden', msg: error.message })
      onOpen()
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  if (!state?.isLogged) return <ErrorPage statusCode={404} />

  return (
    <>
      <Head>
        <title>Can-Shop</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <Navbar />
      <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
        <CustomContainer>
          <Heading>Carrito</Heading>
          <hr />
          {stateCart.products && (
            <>
              {stateCart.products.map((prod, idx) => {
                return <Item key={idx} details={prod} removeBtn={onRemoveItem} />
              })}
              <hr />
              {sinStock && <AlertFeedback opt="warning" msg="No puede generar una orden con productos sin stock" />}
              <hr />
              <Stack direction="row" justifyContent="space-between">
                <Heading size="lg">Subtotal: </Heading>
                <Heading>{stateCart.subTotal}</Heading>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    <Heading size="lg"> Envio a domicilio: </Heading>
                  </FormLabel>
                  <Switch id="email-alerts" onChange={onEnvioChange} />
                </FormControl>
                <Heading>{stateCart.isShipping ? stateCart.shippingCost : 0}</Heading>
              </Stack>
              <hr />
              <Stack direction="row" justifyContent="space-between">
                <Heading> Total: </Heading>
                <Heading>{stateCart.total}</Heading>
              </Stack>
              <Stack alignItems="center">
                <Button colorScheme="blue" width="sm" onClick={onGenerateOrder} disabled={sinStock}>
                  Generar Orden
                </Button>
              </Stack>
            </>
          )}
        </CustomContainer>
      </Container>
      <Footer />

      {/* ------------------------------ ALERT WINDOW ------------------------------ */}
      <AlertWindow isOpen={isOpen} onClose={onClose} title={alert.title} msg={alert.msg} />
      <AlertWindow isOpen={isOpenError} onClose={onCloseError} title="Alerta!" msg="Sesión expirada. Haga login de nuevo." CB={logOut} />
    </>
  )
}

export default Cart
