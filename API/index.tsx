import Cookies from 'universal-cookie'
const cookies = new Cookies()

const HOST = process.env.NEXT_PUBLIC_SERVER
const API = process.env.NEXT_PUBLIC_API_V1

const getProfile = async () => {
  const resp = await fetch(`${HOST}${API}/user`, {
    method: 'GET',
    headers: {
      'set-cookie': cookies.get('token'),
    },
  })
  const data = await resp.json()
  if (!data) {
    cookies.remove('token')
    return null
  }
  return data
}

const loginURL = async (email: string, password: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (resp.status === 422 || resp.status === 404) {
      cookies.remove('token')
      return -1
    }

    const data = await resp.json()

    cookies.set('token', data.token, { path: '/' })
    return data.info
  } catch (error) {
    cookies.remove('token')
    return null
  }
}

const addProductAPI = async (body: any) => {
  try {
    const resp = await fetch(`${HOST}${API}/product`, {
      method: 'POST',
      headers: {
        'set-cookie': cookies.get('token'),
      },
      body: body,
    })
    const data = await resp.json()
    if (data.error) throw new Error(data.data)

    if (resp.status !== 202) {
      throw new Error(data)
    }
    return { error: false, data: data.msg }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

export type ProducInfoToDelete = { id: string; name: string; price: number; quantity: number; imageFile: string }
const getProductsToDelete = async (): Promise<{ error: boolean; data: ProducInfoToDelete[] }> => {
  try {
    const resp = await fetch(`${HOST}${API}/product`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data: ProducInfoToDelete[] = await resp.json()

    if (resp.status !== 200) {
      throw new Error(`Hubo un error.`)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

export type ProducInfoToUpdate = { id: string; name: string; price: number; quantity: number; code: number; description: string; isBanner: boolean }
const getProductToUpdate = async (id: string): Promise<{ error: boolean; data: ProducInfoToUpdate }> => {
  try {
    const resp = await fetch(`${HOST}${API}/product/${id}`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data: ProducInfoToUpdate = await resp.json()

    if (resp.status !== 200) {
      throw new Error(`Hubo un error.`)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const deleteProductAPI = async (id: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/product`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'set-cookie': cookies.get('token'),
      },
      body: JSON.stringify({ id }),
    })
    const data = await resp.json()
    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }

    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const updateProductAPI = async (id: string, body: FormData) => {
  try {
    const resp = await fetch(`${HOST}${API}/product/${id}`, {
      method: 'PATCH',
      headers: {
        'set-cookie': cookies.get('token'),
      },
      body: body,
    })

    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }

    return { error: false, data: 'Producto actualizado' }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

type Info = {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
  address: string
  locality: string
}
const registerAPI = async (info: Info) => {
  try {
    const resp = await fetch(`${HOST}${API}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    const data = await resp.json()
    if (resp.status !== 202) {
      throw new Error(data)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const userUpdateAPI = async (field: Partial<Info>, authID: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/user/${authID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'set-cookie': cookies.get('token'),
      },
      body: JSON.stringify(field),
    })

    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }

    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

/* ---------------------------------- CART ---------------------------------- */

export type ProductInCart = {
  id: string
  name: string
  price: number
  imageFile: string
  available: boolean
}

const fetchProductsFromCart = async () => {
  try {
    const resp = await fetch(`${HOST}${API}/cart`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data: { products: ProductInCart[]; shippingCost: number; error: boolean } = await resp.json()
    if (data.error) throw new Error('Expiró la sesión')
    if (resp.status !== 200) {
      throw new Error(`Hubo un error.`)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const addProductToCart = async (productID: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/cart/${productID}`, {
      method: 'POST',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}
const removeProductFromCart = async (productID: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/cart/${productID}`, {
      method: 'DELETE',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(`Hubo un error.`)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

/* ---------------------------- ORDENES DE COMPRA --------------------------- */

const generateOrder = async (shipping: boolean) => {
  try {
    const resp = await fetch(`${HOST}${API}/orden`, {
      method: 'POST',
      headers: {
        'set-cookie': cookies.get('token'),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isShipping: shipping }),
    })
    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const getOrders = async () => {
  try {
    const resp = await fetch(`${HOST}${API}/orden`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data = await resp.json()

    if (resp.status !== 200) {
      throw new Error(data)
    }

    if (data.error) throw new Error(data.data)

    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const getOneOrder = async (orderID: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/orden/${orderID}`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data = await resp.json()
    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

type Body = {
  method: 'expire' | 'pay' | 'deliver' | 'payLink'
  link?: string
}

const UpdateOrder = async (orderID: string, body: Body) => {
  try {
    const resp = await fetch(`${HOST}${API}/orden/${orderID}`, {
      method: 'PATCH',
      headers: {
        'set-cookie': cookies.get('token'),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await resp.json()

    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }

    if (data.error) throw new Error(data.data)

    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

const getSomeOrders = async (param: string) => {
  try {
    const resp = await fetch(`${HOST}${API}/orden/news/?param=${param}`, {
      method: 'GET',
      headers: {
        'set-cookie': cookies.get('token'),
      },
    })
    const data = await resp.json()
    if (data.error) throw new Error(data.data)

    if (resp.status !== 200) {
      throw new Error(data)
    }
    return { error: false, data: data }
  } catch (error: any) {
    return { error: true, data: error.message }
  }
}

export const useAPI = {
  getProfile,
  loginURL,
  addProductAPI,
  getProductsToDelete,
  deleteProductAPI,
  updateProductAPI,
  registerAPI,
  userUpdateAPI,
  fetchProductsFromCart,
  addProductToCart,
  removeProductFromCart,
  getProductToUpdate,
  generateOrder,
  getOrders,
  getOneOrder,
  UpdateOrder,
  getSomeOrders,
}
