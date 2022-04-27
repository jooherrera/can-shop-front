/* ---------------------------------- TYPES --------------------------------- */

export interface Products {
  image: string
  name: string
  price: number
  id: string
  quantity: number
  imageFile: string
  code: number
}

export type InitialStateSearch = {
  isPerfumeActive: boolean
  isCremaActive: boolean
  isBolsoActive: boolean
  isServiceActive: boolean
  productsOriginalArr: Products[] | []
  productsSearched: Products[] | []
}

enum ActionType {
  LOAD_ORIGINAL = 'LOAD_ORIGINAL',
  PERFUME_ACT = 'PERFUME_ACT',
  CREMA_ACT = 'CREMA_ACT',
  BOLSO_ACT = 'BOLSO_ACT',
  SERVICE_ACT = 'SERVICE_ACT',
  NAV_SEARCH = 'NAV_SEARCH',
  LOAD_SERCHED = 'LOAD_SERCHED',
}

type State = InitialStateSearch
export type ActionSearch = {
  type: ActionType
  payload?: any
}

/* ------------------------------ INITIAL STATE ----------------------------- */
const initialStateCategories = {
  isPerfumeActive: false,
  isCremaActive: false,
  isBolsoActive: false,
  isServiceActive: false,
}
const initialStateSearch = {
  ...initialStateCategories,
  productsOriginalArr: [],
  productsSearched: [],
}

/* ----------------------------- REDUCER OBJECT ----------------------------- */
const reducerObjectSearch = (state: State, action: ActionSearch) => ({
  LOAD_ORIGINAL: {
    ...state,
    productsOriginalArr: action.payload,
    productsSearched: action.payload,
  },
  PERFUME_ACT: {
    ...state,
    ...initialStateCategories,
    isPerfumeActive: true,
  },
  CREMA_ACT: {
    ...state,
    ...initialStateCategories,
    isCremaActive: true,
  },
  BOLSO_ACT: {
    ...state,
    ...initialStateCategories,
    isBolsoActive: true,
  },
  SERVICE_ACT: {
    ...state,
    ...initialStateCategories,
    isServiceActive: true,
  },
  NAV_SEARCH: {
    ...state,
    ...initialStateCategories,
  },
  LOAD_SERCHED: {
    ...state,
    productsSearched: action.payload,
  },
})

/* --------------------------------- REDUCER -------------------------------- */
const reducerSearch = (state: State, action: ActionSearch): State => {
  return reducerObjectSearch(state, action)[action.type] || state
}

/* ---------------------------- ACTIONS-CREATORS ---------------------------- */

export type ActCreator = (payload?: Products[]) => { type: ActionType; payload?: Products[] }

const onLoad = (payload: Products[]) => ({
  type: ActionType.LOAD_ORIGINAL,
  payload,
})

const onPerfume = () => ({
  type: ActionType.PERFUME_ACT,
})

const onCrema = () => ({
  type: ActionType.CREMA_ACT,
})

const onBolso = () => ({
  type: ActionType.BOLSO_ACT,
})

const onService = () => ({
  type: ActionType.SERVICE_ACT,
})

const onNavSearch = () => ({
  type: ActionType.NAV_SEARCH,
})

const onLoadSearched = (payload: Products[] | []) => ({
  type: ActionType.LOAD_SERCHED,
  payload,
})

/* --------------------------------- EXPORT --------------------------------- */
export const SearchReducer = {
  reducer: reducerSearch,
  initialState: initialStateSearch,
  actionCreator: {
    onLoad,
    onPerfume,
    onCrema,
    onBolso,
    onService,
    onNavSearch,
    onLoadSearched,
  },
}
