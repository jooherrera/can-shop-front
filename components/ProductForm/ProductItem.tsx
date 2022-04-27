import { IconButton, Image, Stack, StackDivider, Text, useToast } from '@chakra-ui/react'
import { IColors, IShadows } from '@styles/theme'
import { ProfileContext } from 'context/ProfileContext'
import { useContext } from 'react'
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import Link from 'next/link'
import { useAPI } from 'API'

type ProductItemProps = {
  toDelete?: boolean
  toUpdate?: boolean
  info?: { id: string; imageFile: string; name: string; price: number; quantity: number }
  handlerDelete?: (id: string) => void
}

export const ProductItem = ({ toDelete, info, handlerDelete, toUpdate }: ProductItemProps) => {
  const { state, fetchDelete } = useContext(ProfileContext)
  const toast = useToast()

  const onDeleteClick = async (id: string) => {
    try {
      const resp = await fetchDelete?.(id)
      if (resp?.error) throw new Error(`Hubo un error`)
      handlerDelete?.(id)
    } catch (error: any) {}
  }

  const onAddClick = async (id: string) => {
    try {
      const resp = await useAPI.addProductToCart(id)
      if (resp?.error) throw new Error(resp.data)
      toast({
        position: 'bottom',
        title: 'Producto agregado',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        position: 'bottom',
        title: `${error.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  if (toDelete) {
    return (
      <>
        <Stack divider={<StackDivider />} direction="row" backgroundColor={IColors.item_bg} borderRadius="md" p={3} mt={2} boxShadow={IShadows.shadoItem}>
          <Stack>
            <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${info?.imageFile}`} boxSize="60px" objectFit="contain" alt="IMG" />
          </Stack>
          <Stack justifyContent="space-around" ml={4} textTransform="uppercase" flex={1}>
            <Text fontSize="md">{info?.name}</Text>
            <Stack>
              <Text fontSize="md" fontWeight="600">
                $ {info?.price}
              </Text>
              <Text fontSize="x-small" color="red.400">
                Stock:{info?.quantity}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="end" justifyContent="center">
            <Stack maxWidth="fit-content" mx={2}>
              <IconButton colorScheme="red" aria-label="Call Segun" size="lg" icon={<FaRegTrashAlt />} onClick={() => onDeleteClick(info?.id!)} />
            </Stack>
          </Stack>
        </Stack>
      </>
    )
  }

  if (toUpdate) {
    return (
      <>
        <Stack divider={<StackDivider />} direction="row" backgroundColor={IColors.item_bg} borderRadius="md" p={3} mt={2} boxShadow={IShadows.shadoItem}>
          <Stack>
            <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${info?.imageFile}`} boxSize="60px" objectFit="contain" alt="IMG" />
          </Stack>
          <Stack justifyContent="space-around" ml={4} textTransform="uppercase" flex={1}>
            <Text fontSize="md">{info?.name}</Text>
            <Stack>
              <Text fontSize="md" fontWeight="600">
                $ {info?.price}
              </Text>
              <Text fontSize="x-small" color="red.400">
                Stock:{info?.quantity}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="end" justifyContent="center">
            <Stack maxWidth="fit-content" mx={2}>
              {/* MOD */}
              <Link href={`/auth/update-product/${info?.id}`} passHref>
                <IconButton colorScheme="yellow" aria-label="Call Segun" size="lg" icon={<GrUpdate />} />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <>
      <Stack divider={<StackDivider />} direction="row" backgroundColor={IColors.item_bg} borderRadius="md" p={3} boxShadow={IShadows.shadoItem}>
        <Stack>
          <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${info?.imageFile}`} boxSize="120px" objectFit="contain" alt="IMG" />
        </Stack>
        <Stack justifyContent="space-around" ml={4} textTransform="uppercase" flex={1} position="relative">
          <Text fontSize="xl">{info?.name}</Text>
          <Text fontSize="xl" fontWeight="600">
            $ {info?.price}
          </Text>
          <Text fontSize="small">Stock : {info?.quantity}</Text>

          {state?.isLogged && !state.info.isAdmin && (
            <Stack mx={1} position="absolute" right={0} bottom={0}>
              <IconButton colorScheme="blue" aria-label="Call Segun" size="md" icon={<FaPlus />} onClick={() => onAddClick(info?.id!)} />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  )
}
