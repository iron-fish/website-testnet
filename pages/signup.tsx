import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CountryWithCode, countries } from '../data/countries'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Note from '../components/signup/Note'
import { FieldError } from '../components/signup/FieldStatus'
import SignUpForm from '../components/signup/SignUpForm'
import { createUser, matchError, matchEntity } from '../apiClient'
import { useField } from '../hooks/useForm'

// naive validators
const UNSET = ''
const validateEmail = (x: string) => {
  const dot = x.indexOf('.')
  return x.indexOf('@') > 0 && dot > 0 && dot !== x.length - 1
}
const exists = (x: string) => x.trim().length > 0
const defaultErrorText = `This field is required`

const FIELDS = {
  email: {
    id: 'email',
    label: 'Email',
    placeholder: 'Your email',
    defaultValue: UNSET,
    validation: validateEmail,
    defaultErrorText: `Valid email address required`,
  },
  graffiti: {
    id: 'graffiti',
    label: 'Graffiti',
    placeholder: 'Your tag',
    defaultValue: UNSET,
    validation: exists,
    defaultErrorText,
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
  country: {
    id: 'country',
    label: 'Country',
    defaultValue: 'USA',
    options: countries.map(({ code, name }: CountryWithCode) => ({
      name,
      value: code,
    })),
    validation: () => true,
    defaultErrorText,
  },
}

export default function SignUp() {
  const [$error, $setError] = useState<string>(UNSET)
  const $email = useField(FIELDS.email)
  const $social = useField(FIELDS.social)
  const $graffiti = useField(FIELDS.graffiti)
  const $country = useField(FIELDS.country)
  const [$signedUp, $setSignedUp] = useState<boolean>(false)
  const testInvalid = () => {
    const invalid = !$email?.valid || !$graffiti?.valid || !$social?.valid
    if (invalid) {
      $setError('Please correct the invalid fields below')
    } else {
      $setError(UNSET)
    }
    return invalid
  }
  const submit = async () => {
    if (!$email || !$graffiti || !$social || !$country) return
    const email = $email?.value
    const graffiti = $graffiti?.value
    const social = $social?.value
    const socialChoice = $social?.choice
    const country = $country?.value
    if (testInvalid()) return

    const result = await createUser(
      email,
      graffiti,
      socialChoice,
      social,
      country
    )
    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
      if (matchError(result) === 'USER_EXISTS') {
        const entity = matchEntity(error)
        const matched = [email, graffiti, social].indexOf(entity)
        /* eslint-disable no-console */
        if (matched === 0) {
          console.log('email invalid')
        } else if (matched === 1) {
          console.log('graffiti invalid')
        } else if (matched === 2) {
          console.log('social invalid')
        }
        /* eslint-enable no-console */
      }
    } else {
      $setSignedUp(true)
      // eslint-disable-next-line no-console
      console.log('RESULT', result)
    }
  }
  const textFields = [$email, $graffiti, $social]
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
            {$signedUp
              ? `Thank you for signing up!`
              : `Sign up and get incentivized.`}
          </h1>
          {$error !== UNSET && <FieldError text={$error} size="text-md" />}
          {$signedUp ? (
            <>
              <Note size="">
                Please check your email to validate your account
              </Note>
              <p className="p-2 text-center text-sm">
                Have any questions for our team?{' '}
                <Link href="https://discord.gg/EkQkEcm8DH">
                  <a className=" text-iflightblue">Find us on Discord.</a>
                </Link>
              </p>
            </>
          ) : (
            <SignUpForm
              textFields={textFields}
              country={$country}
              submit={submit}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
