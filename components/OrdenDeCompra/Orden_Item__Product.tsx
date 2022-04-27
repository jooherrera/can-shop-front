import { IColors, IShadows } from '@styles/theme'
import { Image, Stack, StackDivider, Text } from '@chakra-ui/react'
import { Product } from 'pages/mis_ordenes'

type Orden_Item__ProductProps = {
  prod: Product
}

export const Orden_Item__Product = ({ prod }: Orden_Item__ProductProps) => {
  return (
    <>
      <Stack divider={<StackDivider />} direction="row" backgroundColor={IColors.item_bg} borderRadius="md" p={2} boxShadow={IShadows.shadoItem}>
        <Stack>
          <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${prod.imageFile}`} boxSize="40px" objectFit="contain" alt="IMG" />
        </Stack>
        <Stack justifyContent="space-between" ml={4} textTransform="uppercase" flex={1} direction="row" alignItems="center">
          <Text fontSize="sm" fontWeight="bold" width={32}>
            {prod.name}
          </Text>

          <Text fontSize="sm" fontWeight="600">
            $ {prod.price}
          </Text>
        </Stack>
      </Stack>
    </>
  )
}
