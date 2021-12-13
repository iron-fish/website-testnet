import { useCallback, useEffect, useState, KeyboardEvent } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import Navbar from 'components/Navbar'
import TextField from 'components/Form/TextField'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import { RawButton } from 'components/Button'
import { FieldError } from 'components/Form/FieldStatus'
import Loader from 'components/Loader'
import SignupCTA from 'components/login/SignupCTA'

import { WHITESPACE, useField } from 'hooks/useForm'
import { useQuery } from 'hooks/useQuery'

import { useProtectedRoute, STATUS } from 'hooks/useProtectedRoute'
import { scrollUp } from 'utils/scroll'
import { UNSET, validateEmail } from 'utils/forms'

import { login } from 'apiClient'

import { useQueriedToast } from 'hooks/useToast'
import { Toast, Alignment } from 'components/Toast'
import { encode as btoa } from 'base-64'

const FIELDS = {
  email: {
    id: 'email',
    label: 'Email',
    placeholder: 'Your email',
    defaultValue: UNSET,
    validation: validateEmail,
    defaultErrorText: `Valid email address required`,
    WHITESPACE: WHITESPACE.BANNED,
  },
}
export default function Login() {
  const { status } = useProtectedRoute({
    ifLoggedIn: `/leaderboard?toast=${btoa("You're already logged in.")}`,
    timeout: 1500,
  })
  const {
    show: $show,
    visible: $visible,
    message: $toast,
  } = useQueriedToast({
    queryString: 'toast',
    duration: 8e3,
  })

  const $queryEmail = useQuery('email')
  const $queryAutoLogin = useQuery('autoLogin')
  if ($queryEmail) {
    FIELDS.email.defaultValue = $queryEmail
  }
  const [$msg, $setMessage] = useState<string>(UNSET)
  const [$error, $setError] = useState<string>(UNSET)
  const [$loaded, $setLoaded] = useState<boolean>(false)
  const $email = useField(FIELDS.email)
  const textFields = [$email]
  const testInvalid = useCallback(() => {
    const noEmail = !$email?.touched
    const untouched = noEmail
    const invalid = !$email?.valid
    if (invalid || untouched) {
      if (untouched) {
        $setError('Please fill out all fields')
        if (noEmail) $email?.setTouched(true)
      } else {
        $setError('Please correct the invalid fields below')
      }
      scrollUp()
    } else {
      $setError(UNSET)
    }
    return invalid || untouched
  }, [$email, $setError])

  const submit = useCallback(async () => {
    try {
      if (!$email) return
      if (testInvalid()) return
      $setLoaded(false)
      const email = $email?.value

      const result = await login(email)
      if ('error' in result) {
        const error = '' + result.message
        $setLoaded(true)
        $setError(error)
      } else if (
        result &&
        'statusCode' in result &&
        result.statusCode !== 200
      ) {
        $setLoaded(true)
        $setError('' + result.message)
      } else {
        $setLoaded(true)
        $setMessage('Logged in!')
        $show()
        setTimeout(() => Router.push('/leaderboard'), 3e3)
      }
    } catch (e) {
      $setError(e.message)
    }
  }, [$email, testInvalid, $show])
  useEffect(() => {
    if ($email) {
      $setLoaded(true)
      if ($queryEmail) {
        $email.setter($queryEmail)
        if ($queryAutoLogin === 'true') {
          submit()
        }
      }
    }
  }, [$email, $setLoaded, $queryEmail, $queryAutoLogin, submit])
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>
      {status === STATUS.LOADING ? (
        <Loader />
      ) : (
        <>
          <Navbar fill="black" className="bg-ifpink text-black" />
          <Toast
            message={$msg || $toast}
            visible={$visible}
            alignment={Alignment.Top}
          />
          <main className="bg-ifpink flex-1 font-extended">
            <div className="md:w-4/5 w-full my-6 max-w-section mx-auto transition-width">
              <OffsetBorderContainer>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center md:px-4 px-5">
                    {$loaded ? (
                      <>
                        <h1 className="text-4xl text-center mb-4 mt-16">
                          Log in to the testnet.
                        </h1>
                        {$error !== UNSET && (
                          <FieldError text={$error} size="text-md" />
                        )}
                        {textFields.map(
                          t => t && <TextField key={t.id} {...t} />
                        )}
                        <RawButton
                          className="w-full mt-8 max-w-md mb-2 text-lg md:text-xl p-3 md:py-5 md:px-4"
                          onClick={submit}
                          onKeyPress={(e: KeyboardEvent<HTMLButtonElement>) => {
                            if (e.key === 'Enter') {
                              submit()
                            }
                          }}
                        >
                          Login
                        </RawButton>
                      </>
                    ) : (
                      <Loader />
                    )}
                    <SignupCTA />
                  </div>
                </div>
              </OffsetBorderContainer>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
