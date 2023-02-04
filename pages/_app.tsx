import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ResponsiveToolkit from 'components/ResponsiveToolkit'
import { useLogin } from 'hooks/useLogin'
import { useLocalLogin } from 'hooks/useLocalLogin'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const LOCAL_MODE =
  (process.env.NEXT_PUBLIC_LOCAL_USER || '').toLowerCase() === 'true' || false

const useLoginHook = LOCAL_MODE ? useLocalLogin : useLogin

function MyApp({ Component: Page, pageProps }: AppProps) {
  const $login = useLoginHook()
  const { metadata } = $login
  const showNotification = false
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta property="og:image" content="/preview_image.png" />
        <meta property="twitter:image" content="/preview_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveToolkit metadata={metadata} />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? ''}
      >
        <Page
          loginContext={$login}
          showNotification={showNotification}
          {...pageProps}
          className="font-favorit"
        />
      </GoogleReCaptchaProvider>
    </>
  )
}
export default MyApp
