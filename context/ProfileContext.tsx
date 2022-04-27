import { createContext, FC, SetStateAction, useEffect, useReducer, useState } from 'react'
import { ProfileReducer } from 'reducers/profile'
import { ProducInfoToDelete, useAPI } from '../API'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

type ProfileContext = {
  state: typeof ProfileReducer.initialState
  logOut: () => void
  fetchProfile: (URL: () => Promise<any>) => Promise<void>
  loginStatus: boolean
  setLoginStatus: React.Dispatch<SetStateAction<boolean>>
  fetchAddProduct: (body: any) => Promise<{ error: boolean; data: string }>
  fetchAllProductsToDelete: () => Promise<{ error: boolean; data: ProducInfoToDelete[] }>
  fetchDelete: (id: string) => Promise<{ error: boolean; data: string }>
  fetchUpdate: (id: string, body: FormData) => Promise<{ error: boolean; data: string }>
}

const ProfileContext = createContext<Partial<ProfileContext>>({})

const ProfileProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer.reducer, ProfileReducer.initialState)
  const [loginStatus, setLoginStatus] = useState(false)

  const { onFailure, onRequest, onSuccess, onLogOut } = ProfileReducer.actionCreator

  const fetchProfile = async (URL: () => Promise<any>) => {
    try {
      dispatch(onRequest())
      const data = await URL()
      if (data.error) throw new Error(`No se pudo iniciar sesión`)
      if (data === -1) {
        setLoginStatus(true)
        throw new Error(`No se pudo iniciar sesión`)
      }

      dispatch(onSuccess(data))
    } catch (error: any) {
      dispatch(onFailure())
      dispatch(onLogOut())
      cookies.remove('token')
    }
  }

  const logOut = () => {
    dispatch(onLogOut())
    cookies.remove('token')
    window.location.href = '/'
  }

  const fetchAddProduct = async (body: any) => await useAPI.addProductAPI(body)

  const fetchAllProductsToDelete = async () => await useAPI.getProductsToDelete()

  const fetchDelete = async (id: string) => await useAPI.deleteProductAPI(id)

  const fetchUpdate = async (id: string, body: FormData) => await useAPI.updateProductAPI(id, body)

  useEffect(() => {
    fetchProfile(useAPI.getProfile)
  }, [])

  return (
    <ProfileContext.Provider
      value={{ state, logOut, fetchProfile, loginStatus, setLoginStatus, fetchAddProduct, fetchAllProductsToDelete, fetchDelete, fetchUpdate }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContext, ProfileProvider }
