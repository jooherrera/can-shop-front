import { useState } from 'react'
import { ProducInfoToDelete } from '../API'

export const useProduct = () => {
  const [productsOriginal, setProductsOriginal] = useState<ProducInfoToDelete[] | []>([])
  const [searchedProducts, setSearchedProducts] = useState<ProducInfoToDelete[] | []>([])
  const [searchParam, setSearchParam] = useState('')

  const handleSearchParamChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchParam(e.target.value)

  const loadProducts = (prods: ProducInfoToDelete[]) => {
    setProductsOriginal(prods)
    setSearchedProducts(prods)
  }

  const searchProducts = (param: string) => {
    const newArrayOfProds = productsOriginal.filter((prod) => prod.name.toLowerCase().includes(param.toLowerCase()))
    setSearchedProducts(newArrayOfProds)
  }

  const resetSercher = () => {
    setSearchedProducts(productsOriginal)
  }

  const productDeleted = (id: string) => {
    const newArrayofProds = productsOriginal.filter((prod) => prod.id !== id)
    setProductsOriginal(newArrayofProds)
  }

  return {
    productsOriginal,
    searchedProducts,
    searchParam,
    handleSearchParamChange,
    loadProducts,
    searchProducts,
    resetSercher,
    productDeleted,
  }
}
