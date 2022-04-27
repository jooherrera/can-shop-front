import { Stack, Text, Icon } from '@chakra-ui/react'
import { IColors } from '@styles/theme'
import { RiCopyrightLine } from 'react-icons/ri'
export const Footer = () => {
  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center" bg={IColors.primary} h={14} mt={6} position="relative">
        <Text color="white">Candela Herrera</Text>
        <Icon as={RiCopyrightLine} h={12} color="white" />
      </Stack>
    </>
  )
}
