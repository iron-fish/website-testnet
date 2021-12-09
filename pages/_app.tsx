import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ResponsiveToolkit from 'components/ResponsiveToolkit'
import { useLogin } from 'hooks/useLogin'

function MyApp({ Component, pageProps }: AppProps) {
  const $login = useLogin()
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
      <Component
        loginContext={$login}
        {...pageProps}
        className="font-favorit"
      />
    </>
  )
}
export default MyApp
