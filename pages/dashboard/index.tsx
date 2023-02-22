import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { KYCAction } from 'components/Airdrop/KYCAction/KYCAction'
import { InfoChip } from 'components/Airdrop/InfoChip/InfoChip'
import useRequireLogin from 'hooks/useRequireLogin'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoading, metadata } = loginContext
  const isLoading = checkLoading()
  useRequireLogin(loginContext)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>Incentivized Testnet Dashboard</title>
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
        <PageBanner title="Incentivized Testnet Dashboard" text="" />
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'mb-32')}>
            <div className={clsx('flex', 'flex-col', 'w-full')}>
              <KYCAction
                href="/dashboard/rewards"
                title="View Your"
                chip={
                  <InfoChip variant="warning">
                    KYC Deadline for Open Source: March 13th
                  </InfoChip>
                }
              >
                Testnet Rewards
              </KYCAction>
              <KYCAction
                href={`/users/${metadata?.id}`}
                title="View User Profile"
                chip={
                  <InfoChip variant="info">Joined December 5th, 2021</InfoChip>
                }
              >
                JimboJamboJames
              </KYCAction>
            </div>
          </div>
        </div>
        <div className="mb-24"></div>
      </main>
      <Footer />
    </div>
  )
}
