import { useState } from 'react'
import type { Dispatch, SetStateAction, ChangeEvent } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { FieldError } from '../components/signup/FieldStatus'
import SignUpForm from '../components/signup/SignUpForm'
import { createUser, matchError, matchEntity } from '../apiClient'

const trigger = (fn: Dispatch<SetStateAction<string>>) => (e: ChangeEvent) => {
  const value = (e.target as HTMLInputElement).value
  fn(value)
}

// naive validators
const UNSET = 'UNSET'
const validateEmail = (x: string) => {
  const dot = x.indexOf('.')
  return x.indexOf('@') > 0 && dot > 0 && dot !== x.length - 1
}
const exists = (x: string) => x !== UNSET && x.trim().length > 0

const DEFAULT_TOUCHED_STATE: Record<string, boolean> = {
  email: false,
  graffiti: false,
  social: false,
}

export default function SignUp() {
  const [$error, $setError] = useState<string>(UNSET)
  const [$email, $setEmail] = useState<string>(UNSET)
  const [$graffiti, $setGraffiti] = useState<string>(UNSET)
  const [$social, $setSocial] = useState<string>(UNSET)
  const [$country, $setCountry] = useState<string>('USA')
  const [$signedUp, $setSignedUp] = useState<boolean>(false)
  const [$fields, $fieldToucher] = useState<Record<string, boolean>>(
    DEFAULT_TOUCHED_STATE
  )
  const touch = (key: string) => () => {
    testInvalid()
    $fieldToucher({ ...$fields, [key]: true })
  }
  const [setEmail, setGraffiti, setSocial, setCountry] = [
    $setEmail,
    $setGraffiti,
    $setSocial,
    $setCountry,
  ].map(fn => trigger(fn))
  const countryNote = $country === 'USA'
  const validEmail = () => exists($email) && validateEmail($email)
  const validGraffiti = () => exists($graffiti)
  const validSocial = () => exists($social)
  const testInvalid = () => {
    const invalid =
      ($fields.email && !validEmail()) ||
      ($fields.graffiti && !validGraffiti()) ||
      ($fields.social && !validSocial())
    if (invalid) {
      $setError('Please correct the invalid fields below')
    } else {
      $setError(UNSET)
    }
    return invalid
  }
  const submit = async () => {
    if (testInvalid()) return
    const result = await createUser($email, $graffiti, $country)
    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
      if (matchError(result) === 'USER_EXISTS') {
        const entity = matchEntity(error)
        const matched = [$email, $graffiti, $social].indexOf(entity)
        // eslint-disable-next-line no-console
        console.log('matched', matched)
      }
    } else {
      $setSignedUp(true)
      // eslint-disable-next-line no-console
      console.log('RESULT', result)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar fill="black" className="bg-ifpink text-black" />
      <main className="bg-ifpink flex-1 font-extended">
        <section className="offset-box z-10 w-4/5 flex flex-col m-auto py-8 px-2 md:px-4 h-auto mb-16 border-opacity-100 border-2 border-solid border-black bg-white items-center mt-8">
          <h1 className="text-2xl text-center mb-8">
            Sign up and get incentivized.
          </h1>
          {$error !== UNSET && <FieldError text={$error} size="text-md" />}
          {!$signedUp && (
            <SignUpForm
              {...{
                $fields,
                $email,
                $graffiti,
                touch,
                setEmail,
                validEmail,
                setGraffiti,
                validGraffiti,
                $social,
                setSocial,
                validSocial,
                $country,
                setCountry,
                countryNote,
                submit,
              }}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
