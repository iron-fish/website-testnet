import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { CountryWithCode, countries } from '../data/countries'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Note from '../components/signup/Note'
import { FieldError } from '../components/signup/FieldStatus'
import SignUpForm from '../components/signup/SignUpForm'
import { createUser } from '../apiClient'
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
  const scrollUp = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  const testInvalid = () => {
    const noEmail = !$email?.touched
    const noGraffiti = !$graffiti?.touched
    const noSocial = !$social?.touched
    const untouched = noEmail || noGraffiti || noSocial
    const invalid = !$email?.valid || !$graffiti?.valid || !$social?.valid
    if (invalid || untouched) {
      if (untouched) {
        $setError('Please fill out all fields')
        if (noEmail) $email?.setTouched(true)
        if (noGraffiti) $graffiti?.setTouched(true)
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
    if (!$email || !$graffiti || !$social || !$country) return
    if (testInvalid()) return
    const email = $email?.value
    const graffiti = $graffiti?.value
    const social = $social?.value
    const socialChoice = $social?.choice
    const country = $country?.value

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
    } else {
      $setSignedUp(true)
      scrollUp()
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
        <section className="offset-box z-10 md:w-4/5 min-h-section max-w-section flex flex-col m-auto md:px-4 h-auto mb-16 border-opacity-100 border-2 border-solid border-black bg-white items-center mt-8 px-5 pb-16">
          <h1 className="text-4xl text-center mb-4 mt-16">
            {$signedUp
              ? `Thank you for signing up!`
              : `Sign up and get incentivized.`}
          </h1>
          {$error !== UNSET && <FieldError text={$error} size="text-md" />}
          {$signedUp ? (
            <>
              <Note className="mb-8">
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
