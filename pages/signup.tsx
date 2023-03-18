import { useEffect, useState } from 'react'
import Head from 'next/head'
import { LoginContext } from 'hooks/useLogin'
import Loader from 'components/Loader'
import Navbar from 'components/Navbar'
import { Container as OffsetBorderContainer } from 'components/OffsetBorder'
import { CountryWithCode, countries } from 'data/countries'
import { useField, WHITESPACE } from 'hooks/useForm'
import { useProtectedRoute, STATUS } from 'hooks/useProtectedRoute'
import {
  UNSET,
  validateEmail,
  validateGraffiti,
  validateGithub,
  defaultErrorText,
  resetTextField,
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
    whitespace: WHITESPACE.BANNED,
  },
  graffiti: {
    id: 'graffiti',
    label: 'Graffiti',
    placeholder: 'Your tag',
    defaultValue: UNSET,
    validation: validateGraffiti,
    defaultErrorText: `Graffiti is too long`,
    whitespace: WHITESPACE.TRIMMED,
    explanation:
      'A graffiti tag is your Iron Fish username. It is case-sensitive.',
  },
  github: {
    id: 'github',
    label: 'Github',
    required: false,
    placeholder: 'Your github username',
    defaultValue: UNSET,
    validation: validateGithub,
    defaultErrorText: 'Github username is invalid',
    whitespace: WHITESPACE.BANNED,
  },
  social: {
    id: 'social',
    label: '',
    placeholder: 'Your username',
    defaultValue: UNSET,
    required: false,
    validation: () => true,
    defaultErrorText,
    isRadioed: true,
    whitespace: WHITESPACE.BANNED,
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
  showNotification: boolean
  loginContext: LoginContext
}

export default function SignUp({
  showNotification,
  loginContext,
}: SignUpProps) {
  const { status } = useProtectedRoute({
    ifLoggedIn: `/dashboard?toast=${btoa("You're already logged in.")}`,
    loginContext,
  })
  const { visible: $visible, message: $toast } = useQueriedToast({
    queryString: 'toast',
    duration: 8e3,
  })

  const $email = useField(FIELDS.email)
  const $social = useField(FIELDS.social)
  const $graffiti = useField(FIELDS.graffiti)
  const $github = useField(FIELDS.github)
  const $country = useField(FIELDS.country)

  const [$loaded, $setLoaded] = useState<boolean>(false)
  useEffect(() => {
    if ($country?.label) {
      $setLoaded(true)
    }
  }, [$setLoaded, $country])

  // When loading is stopped with an error, the form fields re-render
  // but are empty, so repopulate them.
  if ($email) {
    resetTextField($email)
  }
  if ($graffiti) {
    resetTextField($graffiti)
  }
  if ($github) {
    resetTextField($github)
  }
  if ($social) {
    resetTextField($social)
  }

  // const textFields = [$email, $graffiti, $github, $social]
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
            showNotification={showNotification}
            fill="black"
            className="bg-ifpink text-black"
            loginContext={loginContext}
          />
          <Toast
            showNotification={showNotification}
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
                        {`Sign up is disabled.`}
                      </h1>
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
