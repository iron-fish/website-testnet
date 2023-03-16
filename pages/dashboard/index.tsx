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
import { format } from 'date-fns'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'
import { useGetKycStatus } from 'components/Airdrop/hooks/useGetKycStatus'
import { useGetKycConfig } from 'components/Airdrop/hooks/useGetKycConfig'
import Button from 'components/Button'
import { useRouter } from 'next/router'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoading, metadata } = loginContext
  const isLoading = checkLoading()
  useRequireLogin(loginContext)
  const router = useRouter()

  const {
    status,
    response: statusResponse,
    loading: kycStatusLoading,
  } = useGetKycStatus()
  const { response: kycConfig, loading: kycConfigLoading } = useGetKycConfig()

  const approvalStatusChip = useApprovalStatusChip({
    status: statusResponse?.can_attempt ? status : 'AIRDROP_INELIGIBLE',
    kycConfig,
    details: statusResponse?.can_attempt_reason ?? undefined,
  })

  const needsKyc =
    statusResponse?.can_attempt &&
    ['NOT_STARTED', 'TRY_AGAIN', 'IN_PROGRESS'].includes(status)

  if (isLoading || kycConfigLoading || kycStatusLoading) {
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
                actions={
                  needsKyc && (
                    <>
                      <Button
                        inverted
                        onClick={e => {
                          e.preventDefault()
                          window?.open(
                            'https://coda.io/d/_dte_X_jrtqj/KYC-FAQ_su_vf',
                            '_blank',
                            'noreferrer'
                          )
                        }}
                      >
                        View KYC Faq
                      </Button>
                      <Button
                        onClick={e => {
                          e.preventDefault()
                          router.push('/dashboard/verify')
                        }}
                      >
                        Complete KYC Form
                      </Button>
                    </>
                  )
                }
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
