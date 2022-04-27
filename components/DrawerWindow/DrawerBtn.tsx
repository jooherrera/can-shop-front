import { Alert, AlertIcon, Icon, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconType } from 'react-icons'

interface DrawerBtnProps {
  icon: IconType
  title: string
  url: string
  whatsapp?: boolean
  clicked?: () => void
}

export const DrawerBtn = ({ icon, title, url, whatsapp, clicked }: DrawerBtnProps) => {
  const router = useRouter()

  const onWhatsapp = async () => {
    window.location.href = 'https://wa.me/541160366546'
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
          whatsapp
            ? onWhatsapp
            : () => {
                clicked?.()
                router.push(`${url}`)
              }
        }>
        <Icon as={icon} w={6} h={6} mx={6} />
        <Text fontWeight="normal">{title}</Text>
      </Stack>
    </>
  )
}
