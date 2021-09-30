import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { LoginContext } from 'contexts/LoginContext'
import useLogin from 'hooks/useLogin'

function MyApp({ Component, pageProps }: AppProps) {
  const loginValue = useLogin()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginContext.Provider value={loginValue}>
        <Component {...pageProps} />
      </LoginContext.Provider>
    </>
  )
}
export default MyApp
