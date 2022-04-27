import { FormControl } from '@chakra-ui/react'
import { useAPI } from 'API'
import { useState } from 'react'
import { RegisterForm_Alert } from './RegisterForm_Alert'
import { RegisterForm_Button } from './RegisterForm_Button'
import { RegisterForm_Input } from './RegisterForm_Input'

const useRegisterForm = () => {
  const [status, setStatus] = useState({ error: false, fetching: false, success: false, msg: '' })
  const { value: valueEmail, render: renderEmailInput } = RegisterForm_Input({ title: 'E-mail ' })
  const { value: valuePassword, render: renderPasswordInput } = RegisterForm_Input({ title: 'Password ' })
  const { value: valueName, render: renderNameInput } = RegisterForm_Input({ title: 'Nombre ' })
  const { value: valueLastName, render: renderLastNameInput } = RegisterForm_Input({ title: 'Apellido ' })
  const { value: valuePhone, render: renderPhoneInput } = RegisterForm_Input({ title: 'Teléfono ' })
  const { value: valueAddress, render: renderAddressInput } = RegisterForm_Input({ title: 'Dirección ' })
  const { value: valueLocality, render: renderLocalityInput } = RegisterForm_Input({ title: 'Localidad ' })

  const onHandleSubmit = async () => {
    setStatus({ error: false, fetching: true, success: false, msg: '' })
    const info = {
      email: valueEmail,
      password: valuePassword,
      name: valueName,
      lastName: valueLastName,
      phone: valuePhone,
      address: valueAddress,
      locality: valueLocality,
    }
    const resp = await useAPI.registerAPI(info)
    if (resp.error) {
      return setStatus({ error: true, fetching: false, success: false, msg: resp.data })
    }
    setStatus({ error: false, fetching: false, success: true, msg: resp.data })
  }

  const isDisabled = () => {
    return (
      valueEmail === '' || valuePassword === '' || valueName === '' || valueLastName === '' || valuePhone === '' || valueAddress === '' || valueLocality === ''
    )
  }

  return {
    status,
    onHandleSubmit,
    isDisabled,
    render: (
      <>
        {renderEmailInput}
        {renderPasswordInput}
        {renderNameInput}
        {renderLastNameInput}
        {renderPhoneInput}
        {renderAddressInput}
        {renderLocalityInput}
      </>
    ),
  }
}

export const RegisterForm_UI = () => {
  const { status, isDisabled, onHandleSubmit, render } = useRegisterForm()
  return (
    <>
      {render}
      <FormControl mt={4}>
        <RegisterForm_Button status={status.fetching} onHandleSubmit={onHandleSubmit} isDisabled={isDisabled} />
      </FormControl>
      {status.success && <RegisterForm_Alert opt="success" msg={status.msg} />}
      {status.error && <RegisterForm_Alert opt="error" msg={status.msg} />}
    </>
  )
}
