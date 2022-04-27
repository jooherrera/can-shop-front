import { Button, Container, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { ProfileContext } from 'context/ProfileContext'
import { useProduct } from 'hooks/useProduct'
import { useContext, useEffect } from 'react'
import ErrorPage from 'next/error'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { ProductItem } from '@components/ProductForm/ProductItem'
import { Footer } from '@components/Footer/Footer'
import Head from 'next/head'

const UpdateProduct = () => {
  const { state, fetchAllProductsToDelete } = useContext(ProfileContext)
  const { productsOriginal, searchedProducts, searchParam, handleSearchParamChange, loadProducts, searchProducts, resetSercher, productDeleted } = useProduct()

  const onSubmit = async () => {
    try {
      const resp = await fetchAllProductsToDelete?.()
      if (resp?.error) throw new Error(`Hubo un error`)
      if (resp?.data) {
        loadProducts(resp?.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    onSubmit()
  }, [])

  useEffect(() => {
    if (productsOriginal) {
      if (searchParam !== '') {
        return searchProducts(searchParam)
      }
      resetSercher()
    }
  }, [searchParam, productsOriginal])

  if (!state?.info.isAdmin) {
    return (
      <>
        <ErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      {state?.info.isAdmin ? (
        <>
          <Head>
            <title>Can-Shop</title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Head>
          <Navbar />
          <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
            <CustomContainer>
              <Stack alignItems="center">
                <Heading fontSize="2xl">MODIFICAR PRODUCTO</Heading>
              </Stack>
              <form>
                <FormLabel mt={2}>Buscar producto </FormLabel>
                <Input placeholder="Nombre del producto a buscar" name="id" onChange={handleSearchParamChange} value={searchParam} />
                <Button size="lg" name="btn" bg="gray.300" color="black" loadingText="Cargando" mt={2} onClick={onSubmit}>
                  Buscar
                </Button>
              </form>
            </CustomContainer>
            {searchedProducts.map((prod) => (
              <ProductItem key={prod.id} toUpdate info={prod} handlerDelete={productDeleted} />
            ))}
          </Container>
          <Footer />
        </>
      ) : (
        <div>Error</div>
      )}
    </>
  )
}

export default UpdateProduct
