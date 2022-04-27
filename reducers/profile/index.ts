const initialStateProfile = {
  info: {
    authID: '',
    name: '',
    lastName: '',
    phone: '',
    address: '',
    locality: '',
    isAdmin: false,
  },
  isLogged: false,
  fetching: false,
  success: false,
  error: false,
  loginError: false,
}

const reducerProfileObject = (state: IState, action?: IActionProfile): IReturnObject => ({
  FETCH_PROFILE_FAILURE: {
    ...state,
    error: true,
    fetching: false,
  },
  FETCH_PROFILE_REQUEST: {
    ...state,
    error: false,
    success: false,
    fetching: true,
    loginError: false,
  },
  FETCH_PROFILE_SUCCESS: {
    ...state,
    info: action?.payload,
    isLogged: true,
    fetching: false,
    success: true,
    loginError: false,
  },
  LOGOUT: {
    ...initialStateProfile,
  },
  FAIL_LOGIN: {
    ...initialStateProfile,
    loginError: true,
  },
})

const reducerProfile = (state: IState, action: IActionProfile): IState => {
  return reducerProfileObject(state, action)[action.type] || state
}

/* ---------------------------- ACTIONS-CREATORS ---------------------------- */

const onRequest = () => ({
  type: IActionTypes.FETCH_PROFILE_REQUEST,
})

const onFailure = () => ({
  type: IActionTypes.FETCH_PROFILE_FAILURE,
})

const onSuccess = (payload: any) => ({
  type: IActionTypes.FETCH_PROFILE_SUCCESS,
  payload,
})

const onLogOut = () => ({
  type: IActionTypes.LOGOUT,
})

const onSecondFailure = () => ({
  type: IActionTypes.FAIL_LOGIN,
})

/* ------------------------------- INTERFACES ------------------------------- */
enum IActionTypes {
  FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE',
  LOGOUT = 'LOGOUT',
  FAIL_LOGIN = 'FAIL_LOGIN',
}
type IState = typeof initialStateProfile
type IPayload = Partial<IState>

export type IActionProfile = {
  type: IActionTypes
  payload?: any
}
type IReturnObject = {
  [key in keyof typeof IActionTypes]: IState
}

/* --------------------------------- EXPORT --------------------------------- */
export const ProfileReducer = {
  reducer: reducerProfile,
  initialState: initialStateProfile,
  actionCreator: {
    onSuccess,
    onRequest,
    onFailure,
    onLogOut,
    onSecondFailure,
  },
}
