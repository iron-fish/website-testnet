import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { useEffect, useState } from 'react'
import { JumioIframe } from 'components/Airdrop/JumioIframe/JumioIframe'
import StepSubmitAddress from 'components/Airdrop/StepSubmitAddress/StepSubmitAddress'
import StepConfirmJumioStart from 'components/Airdrop/StepConfirmJumioStart/StepConfirmJumioStart'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

function useWhoAmI() {
  const [myData, setMyData] = useState(null)

  useEffect(() => {
    const doFetch = async () => {
      const res = await fetch('/api/whoami')
      const json = await res.json()
      setMyData(json)
    }

    doFetch()
  }, [])

  return myData
}

function useJumioTransaction({ userId }: { userId?: number }): null | {
  redirectUrl: string
  timestamp: string
  transactionReference: string
} {
  const [jumioTransaction, setJumioTransaction] = useState(null)

  const _data = useWhoAmI()
  // eslint-disable-next-line no-console
  console.log(_data)

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
  const [step, setStep] = useState(0)
  const [_address, setAddress] = useState('')
  const [tempUrl, setTempUrl] = useState('')
  const _loggedIn = checkLoggedIn()
  const _userId = metadata?.id

  // const jumioData = useJumioTransaction({ userId })

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
        <div className="mb-24" />
        {step === 0 && (
          <StepSubmitAddress
            onNext={userAddress => {
              setAddress(userAddress)
              setStep(1)
            }}
          />
        )}
        {step === 1 && (
          <StepConfirmJumioStart
            onNext={url => {
              setTempUrl(url)
              setStep(2)
            }}
          />
        )}
        {step === 2 && <JumioIframe src={tempUrl} />}
        <div className="mb-24" />
      </main>
      <Footer />
    </div>
  )
}
