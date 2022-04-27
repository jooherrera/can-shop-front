import { Container, Stack, Icon, Input, HStack, StackDivider, useDisclosure } from '@chakra-ui/react'
import { IColors } from '@styles/theme'
import { ProfileContext } from 'context/ProfileContext'
import { useInput } from 'hooks/useInput'
import { useRouter } from 'next/router'
import { Products } from 'pages'
import { Dispatch, useContext, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrCart } from 'react-icons/gr'
import { ImSearch } from 'react-icons/im'
import { ActionSearch, SearchReducer } from 'reducers/search'
import { DrawerMenu } from '../../DrawerWindow/DrawerMenu'

type NavbarProp = {
  originalProducts?: Products[]
  dispatch?: Dispatch<ActionSearch>
  canSearch?: boolean
}

export const Navbar = ({ originalProducts, dispatch, canSearch }: NavbarProp) => {
  const router = useRouter()
  const { value, onHandleInput } = useInput('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onNavSearch, onLoadSearched } = SearchReducer.actionCreator
  const { state } = useContext(ProfileContext)

  useEffect(() => {
    dispatch?.(onNavSearch())
    dispatch?.(onLoadSearched(originalProducts!.filter((prod) => prod.name.toLowerCase().includes(value.toLowerCase()))))
  }, [value])

  return (
    <>
      <DrawerMenu handlers={{ onClose, isOpen }} />
      <Stack backgroundColor={IColors.primary} p={3} position="sticky" top={0} zIndex="sticky">
        <Container maxWidth="container.xl" minWidth={350}>
          <HStack direction="row" width="100%" justifyContent="space-between">
            <Stack>
              <Icon as={GiHamburgerMenu} w={7} h={7} marginRight={2} onClick={onOpen} />
            </Stack>
            {canSearch && (
              <Stack direction="row" alignItems="center" flex={1} maxWidth={600} backgroundColor="white" borderRadius={5} p={2} divider={<StackDivider />}>
                <Input placeholder="Buscar un producto..." variant="unstyled" paddingX={2} onChange={onHandleInput} value={value} />
                <Icon as={ImSearch} w={6} h={6} />
              </Stack>
            )}
            <Stack>{state?.isLogged && !state.info.isAdmin && <Icon as={GrCart} w={7} h={7} marginLeft={2} onClick={() => router.push('/cart')} />}</Stack>
          </HStack>
        </Container>
      </Stack>
    </>
  )
}
