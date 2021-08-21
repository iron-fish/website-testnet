import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import TextField from 'components/Form/TextField'
import { useField } from 'hooks/useForm'
import { useQuery } from 'hooks/useQuery'
import { RawButton } from 'components/Button'
import { FieldError } from 'components/Form/FieldStatus'
import Loader from 'components/Loader'
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
        $setError('Check your email')
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
        <section className="offset-box z-10 md:w-4/5 max-w-section flex flex-col m-auto md:px-4 h-auto mb-16 border-opacity-100 border-2 border-solid border-black bg-white items-center mt-8 px-5 pb-16">
          {$loaded ? (
            <>
              <h1 className="text-4xl text-center mb-4 mt-16">
                Log in to the testnet.
              </h1>
              {$error !== UNSET && <FieldError text={$error} size="text-md" />}
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
        </section>
      </main>
      <Footer />
    </div>
  )
}
