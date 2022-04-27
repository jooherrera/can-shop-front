import { Stack } from '@chakra-ui/react'
import { useAPI } from 'API'

import { ProfileContext } from 'context/ProfileContext'
import { useContext } from 'react'
import { LoginForm_Alert } from './LoginForm_Alert'
import { LoginForm_Button } from './LoginForm_Button'
import { LoginForm_Input } from './LoginForm_Input'

export const LoginForm = () => {
  const { fetchProfile, loginStatus, setLoginStatus } = useContext(ProfileContext)
  const { value: email, renderInput: renderEmail } = LoginForm_Input({ label: 'E-mail ', storage: true, watchAlert: setLoginStatus })
  const { value: pass, renderInput: renderPass } = LoginForm_Input({ label: 'Password ', secret: true, watchAlert: setLoginStatus })

  const isError = email === '' || pass === ''

  const onSubmit = async () => {
    if (!isError) {
      setLoginStatus?.(false)
      fetchProfile?.(() => useAPI.loginURL(email, pass))
      localStorage.setItem('email', email)
    }
  }

  return (
    <>
      {renderEmail}
      {renderPass}

      <Stack mt={4}>
        <LoginForm_Button onHandleSubmit={onSubmit} onDisable={isError} />
        {loginStatus && <LoginForm_Alert opt="error" msg="Usuario o contraseña incorrecto" />}
      </Stack>
    </>
  )
}
