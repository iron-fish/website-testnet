import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { LoginContext } from 'contexts/LoginContext'
import useLogin from 'hooks/useLogin'
import useQuery from 'hooks/useQuery'
import useToast from 'hooks/useToast'

function MyApp({ Component, pageProps }: AppProps) {
  const $loginValue = useLogin()
  const $toast = useQuery('toast') || ''
  const { Toast } = useToast({ duration: 10e3 })
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
      <Toast message={$toast} />
      <LoginContext.Provider value={$loginValue}>
        <Component {...pageProps} className="font-favorit" />
      </LoginContext.Provider>
    </>
  )
}
export default MyApp
