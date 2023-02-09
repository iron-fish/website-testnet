import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { useEffect, useState } from 'react'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

function useJumioTransaction({ userId }: { userId?: number }) {
  const [jumioTransaction, setJumioTransaction] = useState(null)

  useEffect(() => {
    if (!userId) {
      return
    }

    const doFetch = async () => {
      const res = await fetch('/api/jumio', {
        method: 'POST',
        body: JSON.stringify({
          userId,
        }),
      })
      const json = await res.json()
      setJumioTransaction(json)
    }

    doFetch()
  }, [userId])

  return jumioTransaction
}

export default function Verify({ showNotification, loginContext }: AboutProps) {
  const { checkLoggedIn, checkLoading, metadata } = loginContext
  const _loggedIn = checkLoggedIn()

  const userId = metadata?.id

  const _result = useJumioTransaction({ userId })

  console.log(_result)

  return checkLoading() ? (
    <Loader />
  ) : (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>KYC TEMP TITLE</title>
        <meta name="description" content="KYC TEMP DESCRIPTION" />
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
        <h1>HELLO WORLD</h1>
        <div className="mb-24"></div>
      </main>
      <Footer />
    </div>
  )
}
