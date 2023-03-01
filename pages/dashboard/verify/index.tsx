import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { useState } from 'react'
import StepJumioIframe from 'components/Airdrop/StepJumioIframe/StepJumioIframe'
import StepSubmitAddress from 'components/Airdrop/StepSubmitAddress/StepSubmitAddress'
import StepConfirmJumioStart from 'components/Airdrop/StepConfirmJumioStart/StepConfirmJumioStart'
import StepKYCComplete from 'components/Airdrop/StepKYCComplete/StepKYCComplete'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function Verify({ showNotification, loginContext }: AboutProps) {
  const { checkLoggedIn, checkLoading, metadata } = loginContext
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')
  const _loggedIn = checkLoggedIn()
  const _userId = metadata?.id

  if (checkLoading()) {
    return <Loader />
  }

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
            onNext={() => {
              setStep(2)
            }}
          />
        )}
        {step === 2 && (
          <StepJumioIframe
            userAddress={address}
            onFinish={() => {
              setStep(3)
            }}
          />
        )}
        {step === 3 && <StepKYCComplete />}
        <div className="mb-24" />
      </main>
      <Footer />
    </div>
  )
}