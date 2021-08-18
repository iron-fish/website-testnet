import { useState } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import TextField from '../components/Form/TextField'
import { useField } from '../hooks/useForm'
import { RawButton } from '../components/Button'
import { FieldError } from '../components/Form/FieldStatus'
import { scrollUp } from '../utils/scroll'
import { UNSET, validateEmail, exists, defaultErrorText } from '../utils/forms'
import { login } from '../apiClient'

const FIELDS = {
  email: {
    id: 'email',
    label: 'Email',
    placeholder: 'Your email',
    defaultValue: UNSET,
    validation: validateEmail,
    defaultErrorText: `Valid email address required`,
  },
  social: {
    id: 'social',
    label: '',
    placeholder: 'Your proof',
    defaultValue: UNSET,
    validation: exists,
    defaultErrorText,
    isRadioed: true,
    options: [
      { name: 'Discord', value: 'discord' },
      { name: 'Telegram', value: 'telegram' },
    ],
  },
}

export default function Login() {
  const [$error, $setError] = useState<string>(UNSET)
  const $email = useField(FIELDS.email)
  const $social = useField(FIELDS.social)
  const textFields = [$email, $social]
  const testInvalid = () => {
    const noEmail = !$email?.touched
    const noSocial = !$social?.touched
    const untouched = noEmail || noSocial
    const invalid = !$email?.valid || !$social?.valid
    if (invalid || untouched) {
      if (untouched) {
        $setError('Please fill out all fields')
        if (noEmail) $email?.setTouched(true)
        if (noSocial) $social?.setTouched(true)
      } else {
        $setError('Please correct the invalid fields below')
      }
      scrollUp()
    } else {
      $setError(UNSET)
    }
    return invalid || untouched
  }
  const submit = async () => {
    if (!$email || !$social) return
    if (testInvalid()) return
    const email = $email?.value
    const social = $social?.value
    const socialChoice = $social?.choice

    const result = await login(email, socialChoice, social)
    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
    } else {
      $setError('HEY GREAT')
    }
  }
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
        </section>
      </main>
      <Footer />
    </div>
  )
}
