import { Button, Image, Stack, Text, useToast } from '@chakra-ui/react'
import { IColors, IShadows } from '@styles/theme'
import { useAPI } from 'API'
import { ProfileContext } from 'context/ProfileContext'
import { useContext } from 'react'

interface ICarrouselItemProps {
  imageFile: string
  id: string
  color: string
  name: string
  price: number
}

export const CarrouselItem = ({ imageFile, id, color = '#33509a', name, price }: ICarrouselItemProps) => {
  const { state } = useContext(ProfileContext)
  const toast = useToast()

  const onBtnClick = async (id: string) => {
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

  return (
    <>
      <Stack
        h={40}
        bg="transparent"
        direction="row"
        alignItems="center"
        justifyContent="center"
        minWidth={{ sm: '300px' }}
        flex={{ base: 1, sm: 0 }}
        spacing={0}
        id={id}>
        <Stack bgGradient={`linear(to-t, ${color}, transparent)`} w={14} h={24} position="relative" borderLeftRadius="md">
          <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${imageFile}`} boxSize={120} objectFit="contain" position="absolute" left={0} alt="IMG" />
        </Stack>
        <Stack bg={IColors.item_bg} h="90%" rounded="sm" px={2} py={2} boxShadow={IShadows.shadoItem} justifyContent="space-between">
          <Text fontSize="xl" fontWeight="semibold">
            {name}
          </Text>
          <Text fontWeight="black">{`$ ${price}`}</Text>

          <Button bg={color} color="white" onClick={() => onBtnClick(id)} disabled={!state?.isLogged || state.info.isAdmin}>
            Agregar al carrito
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
