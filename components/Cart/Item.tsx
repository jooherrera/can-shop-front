import { Badge, IconButton, Image, Stack, StackDivider, Text } from '@chakra-ui/react'
import { IColors, IShadows } from '@styles/theme'
import { ProductInCart } from 'API'
import { FaRegTrashAlt } from 'react-icons/fa'

type ItemProps = {
  details: ProductInCart
  removeBtn: (id: string) => Promise<void>
}

export const Item = ({ details, removeBtn }: ItemProps) => {
  return (
    <>
      <Stack divider={<StackDivider />} direction="row" backgroundColor={IColors.item_bg} borderRadius="md" p={3} mt={2} boxShadow={IShadows.shadoItem}>
        <Stack>
          <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${details.imageFile}`} boxSize="60px" objectFit="contain" alt="IMG" />
        </Stack>
        <Stack justifyContent="space-around" ml={4} textTransform="uppercase" flex={1}>
          <Stack direction="row" alignItems="center">
            <Text fontSize="md">{details.name}</Text>
            {!details.available && (
              <Badge variant="solid" colorScheme="red">
                Sin Stock
              </Badge>
            )}
          </Stack>
          <Stack>
            <Text fontSize="md" fontWeight="600">
              $ {details.price}
            </Text>
          </Stack>
        </Stack>
        <Stack alignItems="end" justifyContent="center">
          <Stack maxWidth="fit-content" mx={2}>
            <IconButton colorScheme="red" aria-label="Call Segun" size="lg" icon={<FaRegTrashAlt />} onClick={() => removeBtn(details.id)} />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
