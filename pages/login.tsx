import { useCallback, useEffect, useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import TextField from 'components/Form/TextField'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import { RawButton } from 'components/Button'
import { FieldError } from 'components/Form/FieldStatus'
import Loader from 'components/Loader'
import SignupCTA from 'components/login/SignupCTA'

import { useField } from 'hooks/useForm'
import { useQuery } from 'hooks/useQuery'
import { scrollUp } from 'utils/scroll'
import { UNSET, validateEmail } from 'utils/forms'
import { login } from 'apiClient'

const FIELDS = {
  email: {
    id: 'email',
    label: 'Email',
    placeholder: 'Your email',
    defaultValue: UNSET,
    validation: validateEmail,
    defaultErrorText: `Valid email address required`,
  },
}

export default function Login() {
  const $queryEmail = useQuery('email')
  const $queryAutoLogin = useQuery('autoLogin')
  if ($queryEmail) {
    FIELDS.email.defaultValue = $queryEmail
  }
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

      const user = await login(email)
      // eslint-disable-next-line
      console.log('USER?', user)
      if ('error' in user) {
        const error = '' + user.message
        $setLoaded(true)
        $setError(error)
      } else if (user && 'statusCode' in user && user.statusCode !== 200) {
        $setLoaded(true)
        $setError('' + user.message)
      } else {
        // eslint-disable-next-line
        console.log({ user })
        $setLoaded(true)
        Router.push(`/users/${user.id}`)
      }
    } catch (e) {
      $setError(e.message)
    }
  }, [$email, testInvalid])

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <main className="bg-ifpink flex-1 font-extended">
        <div className="md:w-4/5 w-full max-w-section my-16 mx-auto transition-width">
          <OffsetBorderContainer>
            <div className="flex justify-center">
              <div className="flex flex-col items-center md:px-4 px-5 pb-16">
                {$loaded ? (
                  <>
                    <h1 className="text-4xl text-center mb-4 mt-16">
                      Log in to the testnet.
                    </h1>
                    {$error !== UNSET && (
                      <FieldError text={$error} size="text-md" />
                    )}
                    {textFields.map(t => t && <TextField key={t.id} {...t} />)}
                    <RawButton
                      className="w-full mt-8 max-w-md mb-2 text-lg md:text-xl p-3 md:py-5 md:px-4"
                      onClick={submit}
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
      <Footer />
    </div>
  )
}
