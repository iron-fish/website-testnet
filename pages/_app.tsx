import 'styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Breakpoints from 'components/Breakpoints'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <Breakpoints />
    </>
  )
}
export default MyApp
