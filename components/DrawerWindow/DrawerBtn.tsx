import { Alert, AlertIcon, Icon, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconType } from 'react-icons'

interface DrawerBtnProps {
  icon: IconType
  title: string
  url: string
  revalidate?: boolean
  clicked?: () => void
}

export const DrawerBtn = ({ icon, title, url, revalidate, clicked }: DrawerBtnProps) => {
  const [revalidateState, setRevalidateState] = useState({ error: false, success: false })
  const router = useRouter()

  const onRevalidate = async () => {
    const controller = new AbortController()
    const signal = controller.signal

    const data = await fetch(url, { signal })
    if (data.status !== 200) {
      setRevalidateState({ error: true, success: false })
    } else {
      setRevalidateState({ error: false, success: true })
    }
    setTimeout(() => {
      setRevalidateState({ error: false, success: false })
    }, 1000)
  }

  return (
    <>
      <Stack
        direction="row"
        as="button"
        alignItems="center"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        py={4}
        fontSize={18}
        fontWeight="semibold"
        bg="transparent"
        _hover={{ bg: '#EDF2F7' }}
        _active={{
          bg: '#dddfe2',
          transform: 'scale(0.9)',
        }}
        onClick={
          revalidate
            ? onRevalidate
            : () => {
                clicked?.()
                router.push(`${url}`)
              }
        }>
        <Icon as={icon} w={6} h={6} mx={6} />
        <Text fontWeight="normal">{title}</Text>
      </Stack>
      {revalidate && revalidateState.error && (
        <Alert status="error">
          <AlertIcon />
          Error al revalidar.
        </Alert>
      )}
      {revalidate && revalidateState.success && (
        <Alert status="success">
          <AlertIcon />
          Revalidado con éxito
        </Alert>
      )}
    </>
  )
}
