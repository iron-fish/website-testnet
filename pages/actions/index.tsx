import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import PageBanner from 'components/PageBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { KYCAction } from 'components/KYC/KYCAction/KYCAction'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoggedIn, checkLoading } = loginContext
  const _loaded = checkLoggedIn()

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
        <PageBanner title="Incentivized Testnet" text="" />
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'mb-32')}>
            <div className={clsx('flex', 'flex-col', 'w-full')}>
              <KYCAction
                href="/actions/verify"
                title="Required Action for testnet rewards"
                chip={
                  <KYCAction.Chip variant="warning">
                    KYC: Incomplete
                  </KYCAction.Chip>
                }
              >
                Complete KYC Form
              </KYCAction>
              <KYCAction
                title="Required Action for testnet rewards"
                chip={
                  <KYCAction.Chip variant="info">
                    Joined on 10/10/2021
                  </KYCAction.Chip>
                }
              >
                Jimbo Jambo James
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
