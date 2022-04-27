import { Icon, Stack, useBreakpoint } from '@chakra-ui/react'
import { IShadows } from '@styles/theme'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import style from '../../styles/Carrousel.module.css'
import { CarrouselItem } from './CarrouselItem'

interface IItems {
  id: string
  imageFile: string
  name: string
  color: string
  price: number
}

interface ICarrouselProps {
  items: IItems[]
}

export const Carrousel = ({ items }: ICarrouselProps) => {
  const [position, setPosition] = useState(0)
  const bp = useBreakpoint()

  const hand = useSwipeable({
    onSwiped: (e) => {
      if (e.dir === 'Right') {
        if (position > 0) {
          setPosition(position - 1)
        }
      } else {
        if (position < items.length - 1) {
          setPosition(position + 1)
        }
      }
    },
  })

  const onRight = () => {
    if (position < items.length - 1) {
      setPosition(position + 1)
    }
  }

  const onLeft = () => {
    if (position > 0) {
      setPosition(position - 1)
    }
  }
  return (
    <>
      {items.length > 0 && (
        <>
          <Stack
            {...hand}
            bg="white"
            direction="row"
            px={5}
            py={4}
            mt={4}
            rounded="lg"
            boxShadow={IShadows.shadowItemContainer}
            overflow="hidden"
            height={48}
            justifyContent="space-around"
            alignItems="center"
            position="relative">
            <Icon as={FiArrowLeft} w={9} h={9} onClick={onLeft} zIndex="base" visibility={{ base: 'hidden', md: `${position === 0 ? 'hidden' : 'visible'}` }} />
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  rotate: 0,
                  left: `${bp === 'base' ? `${(idx - position) * 60 + 16}vw` : `${(idx - position) * 60 + 28}%`} `,
                  scale: idx === position ? 1 : 0.8,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={style.container}>
                <CarrouselItem imageFile={item.imageFile} id={item.id} color={item.color} name={item.name} price={item.price} />
              </motion.div>
            ))}

            <Icon
              as={FiArrowRight}
              w={9}
              h={9}
              onClick={onRight}
              zIndex="base"
              visibility={{ base: 'hidden', md: `${position === items.length - 1 ? 'hidden' : 'visible'}` }}
            />
          </Stack>
        </>
      )}
    </>
  )
}
