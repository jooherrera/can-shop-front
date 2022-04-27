import { Stack } from '@chakra-ui/react'
import { IShadows } from '@styles/theme'
import { FC } from 'react'

export const CustomContainer: FC = ({ children }) => {
  return (
    <>
      <Stack
        direction="column"
        paddingX={5}
        paddingY={6}
        rounded="lg"
        bg="white"
        boxShadow={IShadows.shadowItemContainer}
        spacing={4}
        mt={3}>
        {children}
      </Stack>
    </>
  )
}
