import type { NextPage } from 'next'
import { CustomContainer } from '@components/CustomContainer'
import { GetStaticProps } from 'next'
import { Carrousel } from '@components/Carrousel/Carrousel'
import { Categories } from '@components/Categories/Categories'
import { ProductItem } from '@components/ProductForm/ProductItem'
import { useEffect, useReducer, useState } from 'react'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { Container } from '@chakra-ui/react'
import { Footer } from '@components/Footer/Footer'
import { SearchReducer } from 'reducers/search'
import Head from 'next/head'
const HOST = process.env.NEXT_PUBLIC_SERVER
const API = process.env.NEXT_PUBLIC_API_V1
interface HomeProps {
  promos: ItemsPromo[]
  products: Products[]
}

export interface Products {
  image: string
  name: string
  price: number
  id: string
  quantity: number
  imageFile: string
  code: number
}

interface ItemsPromo {
  id: string
  imageFile: string
  name: string
  color: string
  price: number
}

const Home = () => {
  const { onLoad, onLoadSearched } = SearchReducer.actionCreator
  const [promos, setPromos] = useState([])
  const [state, dispatch] = useReducer(SearchReducer.reducer, SearchReducer.initialState)

  const onLoadPromos = async () => {
    const resp = await fetch(`${HOST}${API}/product/banner`)
    const data = await resp.json()
    setPromos(data)
  }
  const onLoadProducts = async () => {
    const resp = await fetch(`${HOST}${API}/product/all`)
    const data = await resp.json()
    dispatch(onLoad(data))
    dispatch(onLoadSearched(data))
  }

  useEffect(() => {
    onLoadPromos()
    onLoadProducts()
  }, [])

  return (
    <>
      <Head>
        <title>Can-Shop</title>
      </Head>
      <Navbar dispatch={dispatch} originalProducts={state.productsOriginalArr} canSearch />
      <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
        <Carrousel items={promos} />
        <Categories dispatch={dispatch} state={state} />
        <CustomContainer>
          {state.productsSearched.map((prod, idx) => (
            <ProductItem info={prod} key={idx} />
          ))}
        </CustomContainer>
      </Container>
      <Footer />
    </>
  )
}

export default Home
