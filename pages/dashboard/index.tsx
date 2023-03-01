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
import { useJumioStatus } from 'components/Airdrop/hooks/useJumioStatus'
import { format } from 'date-fns'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'
import { useEffect, useState } from 'react'
import { magic } from 'utils'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

type Status =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'TRY_AGAIN'
  | 'FAILED'
  | 'SUBMITTED'
  | 'SUCCESS'

function useGetKycStatus() {
  const [status, setStatus] = useState<Status>('NOT_STARTED')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function doFetch() {
      const apiKey = (await magic?.user.getIdToken()) ?? ''

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })

        const contentType = res.headers.get('content-type')

        if (!contentType || !contentType.includes('application/json')) {
          setStatus('NOT_STARTED')
          return
        }

        const data = await res.json()

        // eslint-disable-next-line no-console
        console.log({ data })
        setStatus('FAILED')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('fetch error', err)
      } finally {
        setLoading(false)
      }
    }
    doFetch()
  }, [])

  return {
    status,
    loading,
  }
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoading, metadata } = loginContext
  const isLoading = checkLoading()
  useRequireLogin(loginContext)

  const kycStatusNew = useGetKycStatus()

  // eslint-disable-next-line
  console.log({ kycStatusNew })

  const { loading: statusLoading, status } = useJumioStatus()

  const approvalStatusChip = useApprovalStatusChip(status.verified)

  if (isLoading || statusLoading) {
    return <Loader />
  }

  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>Incentivized Testnet Dashboard</title>
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
        <PageBanner title="Incentivized Testnet Dashboard" text="" />
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <div className={clsx('flex', 'flex-col', 'md:flex-row', 'mb-32')}>
            <div className={clsx('flex', 'flex-col', 'w-full')}>
              <KYCAction
                href="/dashboard/rewards"
                title="View Your"
                chip={approvalStatusChip}
              >
                Testnet Rewards
              </KYCAction>
              <KYCAction
                href={`/users/${metadata?.id}`}
                title="View User Profile"
                chip={
                  metadata?.created_at && (
                    <InfoChip variant="info">
                      Joined{' '}
                      {format(new Date(metadata.created_at), 'MMM d, yyyy')}
                    </InfoChip>
                  )
                }
              >
                {metadata?.graffiti || '—'}
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
