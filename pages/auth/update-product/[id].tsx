import { Container } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { Footer } from '@components/Footer/Footer'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { ProductForm } from '@components/ProductForm/ProductForm'
import { UpdateProduct_Alert } from '@components/UpdateProduct/UpdateProduct_Alert'
import { ProfileContext } from 'context/ProfileContext'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Item = () => {
  const { state, fetchUpdate } = useContext(ProfileContext)
  const [stateRequest, setStateRequest] = useState({ error: false, success: false, msg: '' })

  const router = useRouter()
  const { id } = router.query

  const onSubmit = async (body: FormData) => {
    try {
      if (!body.has('isBanner')) {
        body.append('isBanner', 'false')
      }
      if (typeof id !== 'string') throw new Error('ID erroneo')
      setStateRequest({ error: false, success: false, msg: '' })
      const resp = await fetchUpdate?.(id, body)
      if (resp?.error) throw new Error(resp.data)
      if (resp?.data) {
        setStateRequest({ error: false, success: true, msg: resp.data })
      }
    } catch (error: any) {
      setStateRequest({ error: true, success: false, msg: error.message })
    }
  }

  useEffect(() => {
    if (!state?.info.isAdmin) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
        <CustomContainer>
          <ProductForm onHandleClick={onSubmit} resetState={setStateRequest} idProduct={String(id)} />

          {stateRequest.success && <UpdateProduct_Alert opt="success" msg={stateRequest.msg} />}
          {stateRequest.error && <UpdateProduct_Alert opt="error" msg={stateRequest.msg} />}
        </CustomContainer>
      </Container>
      <Footer />
    </>
  )
}

export default Item
