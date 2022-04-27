import { ProductInCart } from 'API'
/* ---------------------------------- TYPES --------------------------------- */
export type InitialStateCart = {
  products: ProductInCart[]
  subTotal: number
  shippingCost: number
  total: number
  isShipping: boolean
}

type State = InitialStateCart

enum ActionType {
  LOAD = 'LOAD',
  SET_SHIPPING_COST = 'SET_SHIPPING_COST',
  SET_SUBTOTAL = 'SET_SUBTOTAL',
  SET_TOTAL = 'SET_TOTAL',
  IS_SHIPPING = 'IS_SHIPPING',
}

type ActionCart = {
  type: ActionType
  payload?: any
}

const initialStateCart: InitialStateCart = {
  products: [],
  subTotal: 0,
  shippingCost: 0,
  total: 0,
  isShipping: false,
}

const reducerObjectCart = (state: State, action: ActionCart) => ({
  LOAD: {
    ...state,
    products: action.payload,
  },
  IS_SHIPPING: {
    ...state,
    isShipping: action.payload,
  },
  SET_SHIPPING_COST: {
    ...state,
    shippingCost: action.payload,
  },
  SET_SUBTOTAL: {
    ...state,
    subTotal: action.payload,
  },
  SET_TOTAL: {
    ...state,
    total: state.isShipping ? state.subTotal + state.shippingCost : state.subTotal,
  },
})

/* --------------------------------- REDUCER -------------------------------- */
const reducerCart = (state: State, action: ActionCart): State => {
  return reducerObjectCart(state, action)[action.type] || state
}

/* ----------------------------- ACTIONS CREATORS ---------------------------- */

const setLoad = (payload: ProductInCart[]) => ({
  type: ActionType.LOAD,
  payload,
})

const setSubTotal = (payload: number) => ({
  type: ActionType.SET_SUBTOTAL,
  payload,
})

const setShippingCost = (payload: number) => ({
  type: ActionType.SET_SHIPPING_COST,
  payload,
})

const setTotal = () => ({
  type: ActionType.SET_TOTAL,
})

const setIsShipping = (payload: boolean) => ({
  type: ActionType.IS_SHIPPING,
  payload,
})

export const CartReducer = {
  reducer: reducerCart,
  initialState: initialStateCart,
  actionCreator: {
    setLoad,
    setSubTotal,
    setShippingCost,
    setTotal,
    setIsShipping,
  },
}
