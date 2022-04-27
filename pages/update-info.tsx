import { Alert, AlertIcon, Container, Heading, Stack } from '@chakra-ui/react'
import { CustomContainer } from '@components/CustomContainer'
import { ProfileContext } from 'context/ProfileContext'
import React, { useContext, useState } from 'react'
import { useAPI } from 'API'
import { UserInfoItemUpdate } from '@components/UserUpdateForm/UserInfoItemUpdate'
import { Navbar } from '@components/Layout/Navbar/Navbar'
import { Footer } from '@components/Footer/Footer'
import ErrorPage from 'next/error'
import Head from 'next/head'

const Update = () => {
  const { state, fetchProfile } = useContext(ProfileContext)
  const [status, setStatus] = useState({ error: false, success: false, msg: '' })

  const notificationCB = (childata: { error: boolean; success: boolean; msg: string }) => {
    if (childata.success) {
      fetchProfile?.(useAPI.getProfile)
    }
    setStatus(childata)
  }

  if (!state?.isLogged) return <ErrorPage statusCode={404} />

  return (
    <>
      {state?.info && (
        <>
          <Head>
            <title>Can-Shop</title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Head>
          <Navbar />
          <Container maxWidth={{ base: 'container.xl', sm: 'container.md' }} rounded="md">
            <CustomContainer>
              <Stack alignItems="center">
                <Heading>INFORMACIÓN</Heading>
              </Stack>
              <hr />
              <UserInfoItemUpdate title="Nombre" value={state.info.name} id="name" authID={state.info.authID} cb={notificationCB} />
              <UserInfoItemUpdate title="Apellido" value={state.info.lastName} id="lastName" authID={state.info.authID} cb={notificationCB} />
              <UserInfoItemUpdate title="Telefono" value={state.info.phone} id="phone" authID={state.info.authID} cb={notificationCB} />
              <hr />
              <UserInfoItemUpdate title="Dirección" value={state.info.address} id="address" authID={state.info.authID} cb={notificationCB} />
              <UserInfoItemUpdate title="Localidad" value={state.info.locality} id="locality" authID={state.info.authID} cb={notificationCB} />

              {status.error && (
                <Alert status="error">
                  <AlertIcon />
                  {status.msg}
                </Alert>
              )}
              {status.success && (
                <Alert status="success">
                  <AlertIcon />
                  {status.msg}
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

export default Update
