import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { LoginContext } from 'contexts/LoginContext'
import useLogin from 'hooks/useLogin'

function MyApp({ Component, pageProps }: AppProps) {
  const $loginValue = useLogin()
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
      <LoginContext.Provider value={$loginValue}>
        <Component {...pageProps} className="font-favorit" />
      </LoginContext.Provider>
    </>
  )
}
export default MyApp
