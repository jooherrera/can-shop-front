import { HStack } from '@chakra-ui/react'
import { Dispatch, useEffect, useMemo } from 'react'
import { ActionSearch, InitialStateSearch, SearchReducer } from 'reducers/search'
import { CategoryItem } from './CategoryItem'

type CategoriesProps = {
  dispatch: Dispatch<ActionSearch>

  state: InitialStateSearch
}

export const Categories = ({ dispatch, state }: CategoriesProps) => {
  const { onPerfume, onCrema, onBolso, onService, onLoadSearched } = SearchReducer.actionCreator

  const perfumesList = useMemo(() => {
    return state.productsOriginalArr.filter((prod) => prod.code === 0)
  }, [state.productsOriginalArr])

  const cremasList = useMemo(() => {
    return state.productsOriginalArr.filter((prod) => prod.code === 1)
  }, [state.productsOriginalArr])

  const bolsosList = useMemo(() => {
    return state.productsOriginalArr.filter((prod) => prod.code === 2)
  }, [state.productsOriginalArr])

  const serviceList = useMemo(() => {
    return state.productsOriginalArr.filter((prod) => prod.code === 3)
  }, [state.productsOriginalArr])

  useEffect(() => {
    if (state.isPerfumeActive) {
      return dispatch(onLoadSearched(perfumesList))
    }
    if (state.isCremaActive) {
      return dispatch(onLoadSearched(cremasList))
    }
    if (state.isBolsoActive) {
      return dispatch(onLoadSearched(bolsosList))
    }
    if (state.isServiceActive) {
      return dispatch(onLoadSearched(serviceList))
    }
  }, [state.isPerfumeActive, state.isBolsoActive, state.isCremaActive, state.isServiceActive])

  return (
    <>
      <HStack justifyContent="center" spacing={{ base: 3, sm: 10 }} py={4} mt={3}>
        <CategoryItem img="/public/icons/Perfume-Icon.webp" dispatch={dispatch} actionCreator={onPerfume} state={state.isPerfumeActive} />
        <CategoryItem img="/public/icons/Crema-Icon.webp" dispatch={dispatch} actionCreator={onCrema} state={state.isCremaActive} />
        <CategoryItem img="/public/icons/Cartera-Icon.webp" dispatch={dispatch} actionCreator={onBolso} state={state.isBolsoActive} />
        <CategoryItem img="/public/icons/Maquina-Icon.webp" dispatch={dispatch} actionCreator={onService} state={state.isServiceActive} />
      </HStack>
    </>
  )
}
