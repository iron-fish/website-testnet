import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { LoginAware } from 'hooks/useLogin'
import Loader from 'components/Loader'
import Navbar from 'components/Navbar'
import Note from 'components/Form/Note'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import { FieldError } from 'components/Form/FieldStatus'
import SignUpForm from 'components/signup/SignUpForm'
import { CountryWithCode, countries } from 'data/countries'
import { createUser } from 'apiClient'
import { useField } from 'hooks/useForm'
import { useProtectedRoute, STATUS } from 'hooks/useProtectedRoute'
import { scrollUp } from 'utils/scroll'
import {
  UNSET,
  validateEmail,
  validateGraffiti,
  exists,
  defaultErrorText,
} from 'utils/forms'
import { encode as btoa } from 'base-64'

import { useQueriedToast, Toast, Alignment } from 'hooks/useToast'

export const FIELDS = {
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
    validation: validateGraffiti,
    defaultErrorText: `Graffiti is too long`,
  },
  social: {
    id: 'social',
    label: '',
    placeholder: 'Your username',
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
    defaultValue: UNSET,
    options: countries.map(({ code, name }: CountryWithCode) => ({
      name,
      value: code,
    })),
    validation: (x: string) => x !== UNSET,
    defaultErrorText,
    useDefault: true,
    defaultLabel: 'Select a country',
  },
}

interface SignUpProps {
  loginContext: LoginAware
}

export default function SignUp({ loginContext }: SignUpProps) {
  const $router = useRouter()
  const { status } = useProtectedRoute({
    ifLoggedIn: `/leaderboard?toast=${btoa("You're already logged in.")}`,
    loginContext,
  })
  const { visible: $visible, message: $toast } = useQueriedToast({
    queryString: 'toast',
    duration: 8e3,
  })

  const [$error, $setError] = useState<string>(UNSET)
  const $email = useField(FIELDS.email)
  const $social = useField(FIELDS.social)
  const $graffiti = useField(FIELDS.graffiti)
  const $country = useField(FIELDS.country)
  const [$signedUp, $setSignedUp] = useState<boolean>(false)
  const [$loaded, $setLoaded] = useState<boolean>(false)
  useEffect(() => {
    if ($country?.label) {
      $setLoaded(true)
    }
  }, [$setLoaded, $country])
  const testInvalid = useCallback(() => {
    const noEmail = !$email?.touched
    const noGraffiti = !$graffiti?.touched
    const noSocial = !$social?.touched
    // for old men
    const noCountry = !$country?.touched
    const untouched = noEmail || noGraffiti || noSocial || noCountry
    const invalid =
      !$email?.valid || !$graffiti?.valid || !$social?.valid || !$country?.valid

    if (invalid || untouched) {
      if (untouched) {
        $setError('Please fill out all fields')
        if (noEmail) $email?.setTouched(true)
        if (noGraffiti) $graffiti?.setTouched(true)
        if (noSocial) $social?.setTouched(true)
        if (noCountry) $country?.setTouched(true)
      } else {
        $setError('Please correct the invalid fields below')
      }
      scrollUp()
    } else {
      $setError(UNSET)
    }
    return invalid || untouched
  }, [$country, $email, $graffiti, $social])
  const submit = useCallback(async () => {
    if (!$email || !$graffiti || !$social || !$country) return
    if (testInvalid()) return
    const email = $email?.value
    const graffiti = $graffiti?.value
    const social = $social?.value
    const socialChoice = $social?.choice
    const country = $country?.value
    $setLoaded(false)

    const result = await createUser(
      email,
      graffiti,
      socialChoice,
      social,
      country
    )

    $setLoaded(true)

    if ('error' in result) {
      const error = '' + result.message
      $setError(error)
    } else {
      $setSignedUp(true)
      scrollUp()
      $router.push(`/login?email=${encodeURIComponent(email)}`)
    }
  }, [$router, $email, $graffiti, $social, $country, testInvalid])

  // When loading is stopped with an error, the form fields re-render
  // but are empty, so repopulate them.
  if ($email) {
    $email.defaultValue = $email.value || UNSET
  }
  if ($graffiti) {
    $graffiti.defaultValue = $graffiti.value || UNSET
  }
  if ($social) {
    $social.defaultValue = $social.value || UNSET
  }

  const textFields = [$email, $graffiti, $social]
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up" />
      </Head>
      {status === STATUS.LOADING ? (
        <Loader />
      ) : (
        <>
          <Navbar
            fill="black"
            className="bg-ifpink text-black"
            loginContext={loginContext}
          />
          <Toast
            message={$toast}
            visible={$visible}
            alignment={Alignment.Top}
          />
          <main className="bg-ifpink flex-1 font-extended">
            <div className="md:w-4/5 w-full my-6 max-w-section mx-auto transition-width">
              <OffsetBorderContainer>
                <div
                  style={{ minHeight: '43rem', maxWidth: '53.5rem' }}
                  className="flex flex-col m-auto h-auto items-center px-5 pb-2"
                >
                  {!$loaded ? (
                    <Loader />
                  ) : (
                    <>
                      <h1 className="text-4xl text-center mb-4 mt-16">
                        {$signedUp
                          ? `Thank you for signing up!`
                          : `Sign up and get incentivized.`}
                      </h1>
                      {$error !== UNSET && (
                        <FieldError text={$error} size="text-md" />
                      )}
                      {$signedUp ? (
                        <>
                          <Note className="mb-8">
                            Please check your email to validate your account
                          </Note>
                          <p className="p-2 text-center text-sm">
                            Have any questions for our team?{' '}
                            <Link href="https://discord.gg/EkQkEcm8DH">
                              <a className=" text-iflightblue">
                                Find us on Discord.
                              </a>
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
                    </>
                  )}
                </div>
              </OffsetBorderContainer>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
