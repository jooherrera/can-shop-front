type Product = {
  id: string
  name: string
  price: number
  quantity: number
  imageFile: string
}

type Order = {
  _id: string
  products: Product[]
  subTotal: number
  shippingCost: number
  total: number
  isPaid: boolean
  isDelivered: boolean
  isExpired: boolean
  name: string
  lastName: string
  phone: string
  isPayLink: boolean
  payLink: string
}

type InitialStateOrder = {
  orders: Order[]
  serverMsg: string
  errorFetching: boolean
  successFetching: boolean
}

const initialStateOrder: InitialStateOrder = {
  orders: [],
  serverMsg: '',
  errorFetching: false,
  successFetching: false,
}

type State = InitialStateOrder

enum ActionType {
  LOAD = 'LOAD',
  ON_FETCHING = 'ON_FETCHING',
  ON_ERROR = 'ON_ERROR',
  ON_SUCCESS = 'ON_SUCCESS',
  UPDATE = 'UPDATE',
}

type ActionOrder = {
  type: ActionType
  payload?: any
}

const reducerObjectOrder = (state: State, action: ActionOrder) => ({
  ON_FETCHING: {
    ...initialStateOrder,
  },
  LOAD: {
    ...initialStateOrder,
    orders: action.payload,
  },
  ON_ERROR: {
    ...state,
    errorFetching: true,
    serverMsg: action.payload,
  },
  ON_SUCCESS: {
    ...state,
    successFetching: true,
    serverMsg: action.payload,
  },
  UPDATE: {
    ...state,
    orders: action.payload,
  },
})

const reducerOrder = (state: State, action: ActionOrder): State => {
  return reducerObjectOrder(state, action)[action.type] || state
}

const onFetching = () => ({
  type: ActionType.ON_FETCHING,
})

const onLoad = (payload: Order[]) => ({
  type: ActionType.LOAD,
  payload: payload,
})

const onError = (payload: string) => ({
  type: ActionType.ON_ERROR,
  payload: payload,
})

const onSuccess = (payload: string) => ({
  type: ActionType.ON_SUCCESS,
  payload: payload,
})

const onUpdate = (payload: Order[]) => ({
  type: ActionType.UPDATE,
  payload: payload,
})

export const OrderReducer = {
  reducer: reducerOrder,
  initialState: initialStateOrder,
  actionCreators: {
    onFetching,
    onLoad,
    onError,
    onSuccess,
    onUpdate,
  },
}
