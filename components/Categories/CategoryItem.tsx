import { HStack, Image } from '@chakra-ui/react'
import { IColors } from '@styles/theme'
import style from '@styles/Category.module.css'
import { Dispatch } from 'react'
import { ActCreator, ActionSearch } from 'reducers/search'

interface CategoryItemProps {
  img: string
  dispatch: Dispatch<ActionSearch>
  actionCreator: ActCreator
  state: boolean
}

export const CategoryItem = ({ img, dispatch, actionCreator, state }: CategoryItemProps) => {
  return (
    <>
      <HStack
        borderRadius="full"
        boxSize={20}
        backgroundColor={IColors.secondary}
        justifyContent="center"
        onClick={() => dispatch(actionCreator())}
        className={`${state ? style.categoryItemActive : ''}`}>
        <Image src={img} boxSize={10} alt="IMG" />
      </HStack>
    </>
  )
}
