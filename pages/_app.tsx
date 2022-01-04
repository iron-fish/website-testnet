import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ResponsiveToolkit from 'components/ResponsiveToolkit'
import { useLogin } from 'hooks/useLogin'
import { useLocalLogin } from 'hooks/useLocalLogin'

const LOCAL_MODE = process.env.NEXT_PUBLIC_LOCAL_USER || false
const loginHook = LOCAL_MODE ? useLocalLogin : useLogin

function MyApp({ Component: Page, pageProps }: AppProps) {
  const $login = loginHook()
  const { metadata } = $login
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
      <Page loginContext={$login} {...pageProps} className="font-favorit" />
    </>
  )
}
export default MyApp
