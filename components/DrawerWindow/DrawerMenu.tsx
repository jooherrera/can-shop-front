import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, StackDivider, Text } from '@chakra-ui/react'
import { GrConfigure } from 'react-icons/gr'
import { AiOutlineHome } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

import { useRouter } from 'next/router'
import { DrawerBtn } from './DrawerBtn'
import { ModalFormBtn } from '../ModalFormBtn/ModalForm'
import { useContext } from 'react'
import { ProfileContext } from 'context/ProfileContext'
import { RiWhatsappFill } from 'react-icons/ri'

interface IDrawerMenuProps {
  handlers: {
    onClose: () => void
    isOpen: boolean
  }
}

export const DrawerMenu = ({ handlers }: IDrawerMenuProps) => {
  const { state } = useContext(ProfileContext)

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const router = useRouter()

  return (
    <>
      <Drawer placement="left" onClose={handlers.onClose} isOpen={handlers.isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Stack direction="row" alignItems="center" w="100%">
              <Text>{state?.info.name ? `${capitalize(state?.info.name)} ${capitalize(state?.info.lastName)}` : 'Invitado'} </Text>

              {/* <Stack flex={1} alignItems="flex-end">
                <Avatar name={state?.info.name} src="" />
              </Stack> */}
            </Stack>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Stack divider={<StackDivider />} spacing={3}>
              <Stack mt={5}>
                <DrawerBtn icon={AiOutlineHome} title="Inicio" url="/" clicked={handlers.onClose} />
              </Stack>
              {state?.info.isAdmin && (
                <>
                  <DrawerBtn icon={GrConfigure} title="Agregar producto" url="/auth/add-product" clicked={handlers.onClose} />
                  <DrawerBtn icon={GrConfigure} title="Eliminar producto" url="/auth/delete-product" clicked={handlers.onClose} />
                  <DrawerBtn icon={GrConfigure} title="Modificar producto" url="/auth/update-product" clicked={handlers.onClose} />
                  <hr />
                  <DrawerBtn icon={GrConfigure} title="Actualizar orden" url="/auth/update-orden" clicked={handlers.onClose} />
                  <hr />
                  {/* <DrawerBtn icon={GrConfigure} title="Revalidate" url="/api/revalidate/?secret=secret" revalidate /> */}
                </>
              )}

              {state?.isLogged && !state?.info.isAdmin && (
                <>
                  <DrawerBtn icon={GrConfigure} title="Actualizar información" url="/update-info" clicked={handlers.onClose} />
                  <DrawerBtn icon={BsFillBagCheckFill} title="Mis ordenes" url="/mis_ordenes" clicked={handlers.onClose} />
                </>
              )}
            </Stack>
            {!state?.info.isAdmin && (
              <Stack mt={5}>
                <DrawerBtn icon={RiWhatsappFill} title="Enviar mensaje" url="https://wa.me/541127748848" clicked={handlers.onClose} whatsapp />
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" justifyContent="center">
            <ModalFormBtn />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
