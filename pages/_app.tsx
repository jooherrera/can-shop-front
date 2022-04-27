import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from '@styles/theme'
import { ProfileProvider } from 'context/ProfileContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <ProfileProvider>
        <Component {...pageProps} />
      </ProfileProvider>
    </ChakraProvider>
  )
}

export default MyApp
