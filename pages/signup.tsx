import { useState } from 'react'
import type { Dispatch, SetStateAction, ChangeEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import { Country, countries } from '../data/countries'

type FormRowProps = {
  className?: string
  children?: React.ReactNode
}

const FormRow = ({ className = '', children }: FormRowProps) => (
  <div
    className={`flex flex-col p-2 w-11/12 sm:w-7/12 mb-4 border-2 rounded-md border-solid border-black ${className}`}
  >
    {children}
  </div>
)

const FIELDS = [
  { label: 'Email', placeholder: 'Your email' },
  { label: 'Graffiti', placeholder: 'Your tag' },
  { label: 'Discord or Telegram', placeholder: 'Your proof' },
]

type LabelledRowProps = {
  id: string
  label: string
  required?: boolean
  children?: React.ReactNode
}

const LabelledRow = ({
  id,
  label,
  children,
  required = true,
}: LabelledRowProps) => (
  <FormRow>
    <label htmlFor={id} className="text-sm font-favorit">
      {label}
      {required && <span className="text-md text-gray-500">*</span>}
    </label>
    {children}
  </FormRow>
)

const trigger = (fn: Dispatch<SetStateAction<string>>) => (e: ChangeEvent) => {
  const value = (e.target as HTMLInputElement).value
  fn(value)
}

const Warning = () => (
  <div className={`p-2 w-11/12 sm:w-7/12 mb-8 bg-statusyellow text-sm`}>
    <strong>Please note</strong>: US participants are not eligible for Iron Fish
    coin rewards
  </div>
)

const FinePrint = () => (
  <span className="font-favorit p-2 w-11/12 sm:w-7/12 mb-4 text-xs text-center">
    By clicking on sign up, you agree to Iron Fish&apos;s Testnet Guidelines.
  </span>
)

const LoginCTA = () => (
  <div className="text-center text-xl">
    Have an account?{' '}
    <Link href="/login">
      <a className="text-iflightblue">Log In</a>
    </Link>
  </div>
)

export default function SignUp() {
  const [$email, $setEmail] = useState<string>('')
  const [$graffiti, $setGraffiti] = useState<string>('')
  const [$social, $setSocial] = useState<string>('')
  const [$country, $setCountry] = useState<string>('US')
  const setEmail = trigger($setEmail)
  const setGraffiti = trigger($setGraffiti)
  const setSocial = trigger($setSocial)
  const setCountry = trigger($setCountry)
  const countryWarning = $country === 'US'
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>SignUp</title>
        <meta name="description" content="SignUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar fill="black" className="bg-ifpink text-black" />

      <main className="bg-ifpink flex-1 font-extended">
        <section className="offset-box z-10 w-4/5 flex flex-col m-auto py-8 px-2 md:px-4 h-auto mb-16 border-opacity-100 border-2 border-solid border-black bg-white items-center mt-8">
          <h1 className="text-2xl text-center mb-8">
            Sign up and get incentivized.
          </h1>
          {FIELDS.map(({ label, placeholder }) => {
            const id = label.toLowerCase().replace(/\s/g, '-')
            return (
              <LabelledRow key={id} id={id} label={label}>
                <input
                  onChange={
                    id === 'email'
                      ? setEmail
                      : id === 'graffiti'
                      ? setGraffiti
                      : setSocial
                  }
                  className="font-favorit"
                  id={id}
                  type="text"
                  placeholder={placeholder}
                />
              </LabelledRow>
            )
          })}
          <LabelledRow key="country" id="country" label="Country">
            <select onChange={setCountry} value={$country}>
              {countries.map(({ code, name }: Country) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </LabelledRow>
          {countryWarning && <Warning />}
          <Button className="w-11/12 sm:w-7/12 mb-4 text-md md:text-lg">
            Sign Up
          </Button>
          <FinePrint />
          <LoginCTA />
        </section>
      </main>
      <Footer />
    </div>
  )
}
