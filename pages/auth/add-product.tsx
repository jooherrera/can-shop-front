import { Alert, AlertIcon, Container, Heading, Stack } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { ProfileContext } from 'context/ProfileContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { ProductForm } from '@components/ProductForm/ProductForm'
import { Footer } from '@components/Footer/Footer'
import Head from 'next/head'

const AddProduct = () => {
  const { state, fetchAddProduct } = useContext(ProfileContext)
  const [stateRequest, setStateRequest] = useState({ error: false, success: false, msg: '' })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      setStateRequest({ error: false, success: false, msg: '' })
      const resp = await fetchAddProduct?.(data)
      if (resp?.error) throw new Error(resp.data)
      setStateRequest({ error: false, success: true, msg: resp?.data || 'Producto agregado' })
    } catch (error: any) {
      setStateRequest({ error: true, success: false, msg: error.message || 'No se pudo agregar el producto' })
    }
  }

  useEffect(() => {
    if (!state?.info.isAdmin) {
      router.push('/')
    }
  }, [])

  return (
    <>
      {state?.info.isAdmin && (
        <>
          <Head>
            <title>Can-Shop</title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Head>
          <Navbar />
          <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
            <CustomContainer>
              <Stack alignItems="center">
                <Heading>AGREGAR PRODUCTO</Heading>
              </Stack>
              <ProductForm onHandleClick={onSubmit} resetState={setStateRequest} required />
              {stateRequest.success && (
                <Alert status="success">
                  <AlertIcon />
                  {stateRequest.msg}
                </Alert>
              )}
              {stateRequest.error && (
                <Alert status="error">
                  <AlertIcon />
                  {stateRequest.msg}
                </Alert>
              )}
            </CustomContainer>
          </Container>
          <Footer />
        </>
      )}
    </>
  )
}

export default AddProduct
