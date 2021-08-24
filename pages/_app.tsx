import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Breakpoints from 'components/Breakpoints'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Breakpoints />
    </>
  )
}
export default MyApp
