export enum IActionCategoryItemType {
  PERFUME_ACTIVE = 'PERFUME_ACTIVE',
  CREMA_ACTIVE = 'CREMA_ACTIVE',
  BOLSO_ACTIVE = 'BOLSO_ACTIVE',
  SERVICE_ACTIVE = 'SERVICE_ACTIVE',
}

export interface IActionCategoryItem {
  type: IActionCategoryItemType
  payload?: any
}

type IState = typeof initialStateCatergoryItems

export const initialStateCatergoryItems = {
  isPerfumeActive: false,
  isCremaActive: false,
  isBolsoActive: false,
  isServiceActive: false,
}

const reducerObject = (state: IState, action: IActionCategoryItem) => ({
  PERFUME_ACTIVE: {
    ...initialStateCatergoryItems,
    isPerfumeActive: true,
  },
  CREMA_ACTIVE: {
    ...initialStateCatergoryItems,
    isCremaActive: true,
  },
  BOLSO_ACTIVE: {
    ...initialStateCatergoryItems,
    isBolsoActive: true,
  },
  SERVICE_ACTIVE: {
    ...initialStateCatergoryItems,
    isServiceActive: true,
  },
})

export const reducerCategoryItems = (state: IState, action: IActionCategoryItem) => {
  return reducerObject(state, action)[action.type] || state
}
