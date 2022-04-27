import { Button, Checkbox, FormLabel, Icon, Input, InputGroup, InputLeftElement, Select, Textarea } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ProducInfoToUpdate, useAPI } from 'API'

type ProductItemProps = {
  onHandleClick: (data: FormData) => Promise<void>
  resetState: Dispatch<
    SetStateAction<{
      error: boolean
      success: boolean
      msg: string
    }>
  >
  required?: boolean
  idProduct?: string
}

export const ProductForm = ({ onHandleClick, resetState, required = false, idProduct }: ProductItemProps) => {
  const [inputCode, setInputCode] = useState('')
  const [inputName, setInputName] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [inputStock, setInputStock] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [img, setImg] = useState(false)
  const [isBanner, setIsBanner] = useState(false)
  const imgRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [infoProd, setInfoProd] = useState<ProducInfoToUpdate | null>(null)

  const resetStateRequest = <T,>(cb: Dispatch<SetStateAction<T>>, v: any) => {
    cb(v)
    resetState({ error: false, success: false, msg: '' })
  }
  const isDisabled = () => {
    if (required) {
      return inputCode === '' || inputName === '' || inputPrice === '' || inputStock === '' || inputDescription === '' || img === false
    }
    return false
  }

  const handleInputCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => resetStateRequest(setInputCode, e.target.value)
  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => resetStateRequest(setInputName, e.target.value)
  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => resetStateRequest(setInputPrice, e.target.value)
  const handleInputStockChange = (e: React.ChangeEvent<HTMLInputElement>) => resetStateRequest(setInputStock, e.target.value)
  const handleInputDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => resetStateRequest(setInputDescription, e.target.value)
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => resetStateRequest(setImg, true)

  const findProductToUpdate = async (id: string) => {
    try {
      const resp = await useAPI.getProductToUpdate(id)
      if (resp.error) throw new Error('Error')
      setInfoProd(resp.data)
      setIsBanner(resp.data.isBanner)
    } catch (error) {}
  }

  const onSubmitForm = () => {
    const body = new FormData(formRef.current!)
    onHandleClick(body)
  }

  useEffect(() => {
    if (idProduct) {
      findProductToUpdate(idProduct)
    }
  }, [])

  return (
    <>
      <form ref={formRef}>
        <FormLabel>Código {!inputCode && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <Select id="code" name="code" placeholder="Selecciona la categoria del producto" onChange={handleInputCodeChange} value={inputCode}>
          <option value={0}>Perfume</option>
          <option value={1}>Crema</option>
          <option value={2}>Cartera</option>
          <option value={3}>Servicio</option>
        </Select>
        <FormLabel mt={2}>Nombre {!inputName && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <Input placeholder={infoProd ? infoProd.name : 'Nombre del producto'} name="name" onChange={handleInputNameChange} value={inputName} />
        <FormLabel mt={2}>Precio {!inputPrice && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
          <Input
            type="number"
            name="price"
            placeholder={infoProd ? String(infoProd.price) : 'Precio -- Punto para decimal. $1000.5'}
            onChange={handleInputPriceChange}
            value={inputPrice}
          />
        </InputGroup>
        <FormLabel mt={2}>Cantidad de Stock {!inputStock && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <Input
          placeholder={infoProd ? String(infoProd.quantity) : 'Cantidad de Stock'}
          name="quantity"
          type="number"
          onChange={handleInputStockChange}
          value={inputStock}
        />
        <FormLabel mt={2}>Descripcion {!inputDescription && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <Textarea
          value={inputDescription}
          name="description"
          onChange={handleInputDescriptionChange}
          placeholder={infoProd ? infoProd.description : 'Ingresa acá una descripción'}
          size="sm"
          resize="none"
        />

        <FormLabel mt={2}>Banner</FormLabel>

        <Checkbox name="isBanner" isChecked={isBanner} onChange={(e) => setIsBanner(e.target.checked)} value={JSON.stringify(isBanner)}></Checkbox>

        <FormLabel mt={2}>Imagen {!img && required && <Icon as={BiErrorAlt} color="red" />}</FormLabel>
        <Input type="file" name="imageFile" variant="unstyled" p={1} onChange={handleImgChange} ref={imgRef} />
        <Button size="lg" name="btn" bg="gray.300" color="black" loadingText="Cargando" mt={2} isDisabled={isDisabled()} onClick={onSubmitForm}>
          Enviar
        </Button>
      </form>
    </>
  )
}
