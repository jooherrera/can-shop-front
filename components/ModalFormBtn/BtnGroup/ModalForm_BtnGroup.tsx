import { useState } from 'react'
import { ModalForm_Btn } from './ModalForm_Btn'

export const ModalForm_BtnGroup = () => {
  const [state, setState] = useState({ R: false, L: true })

  const onHandleBtn = (child: { R: boolean; L: boolean }) => {
    setState(child)
  }

  return {
    state,
    render: (
      <>
        <ModalForm_Btn btnName="Register" cb={onHandleBtn} state={state.R} color="green" />
        <ModalForm_Btn btnName="Login" cb={onHandleBtn} state={state.L} color="blue" />
      </>
    ),
  }
}
