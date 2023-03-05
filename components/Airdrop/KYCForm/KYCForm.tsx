import clsx from 'clsx'
import Head from 'next/head'

import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { LoginContext } from 'hooks/useLogin'

type KYCFormProps = {
  showNotification: boolean
  loginContext: LoginContext
  children: React.ReactNode
}

export function KYCForm({
  loginContext,
  showNotification,
  children,
}: KYCFormProps) {
  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>KYC Form</title>
        <meta name="description" content="" />
      </Head>
      <Navbar
        showNotification={showNotification}
        fill="black"
        className={clsx('bg-ifpink', 'text-black')}
        loginContext={loginContext}
      />
      <main
        className={clsx(
          'bg-ifpink',
          'flex-1',
          'items-center',
          'flex',
          'flex-col'
        )}
      >
        <div className="mb-24" />
        {children}
        <div className="mb-24" />
      </main>
      <Footer />
    </div>
  )
}
