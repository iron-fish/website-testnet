import Head from 'next/head'
import clsx from 'clsx'

import { LoginContext } from 'hooks/useLogin'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

import Loader from 'components/Loader'
import { Box } from 'components/OffsetBorder'
import Button from 'components/Button'
import FishAvatar from 'components/user/FishAvatar'
import { InfoChip } from 'components/Airdrop/InfoChip/InfoChip'
import { RewardItem } from 'components/Airdrop/RewardItem/RewardItem'
import Link from 'next/link'
import BackArrow from 'components/icons/BackArrow'
import useRequireLogin from 'hooks/useRequireLogin'
import useUserAllTimeMetrics from 'components/Airdrop/hooks/useUserAllTimeMetrics'
import { useRouter } from 'next/router'
import { format, isPast } from 'date-fns'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'
import { useGetKycStatus } from 'components/Airdrop/hooks/useGetKycStatus'
import { useGetKycConfig } from 'components/Airdrop/hooks/useGetKycConfig'
import WalletAddress from 'components/Airdrop/WalletAddress/WalletAddress'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoading, metadata } = loginContext
  const router = useRouter()

  const isLoading = checkLoading()

  useRequireLogin(loginContext)

  const userAllTimeMetrics = useUserAllTimeMetrics(metadata?.id)

  const kycStatus = useGetKycStatus()
  const { response: kycConfig } = useGetKycConfig()
  const kycAttempts = kycStatus.response?.kyc_attempts ?? 0
  const kycMaxAttempts = kycStatus.response?.kyc_max_attempts ?? 3
  const canAttemptKyc = kycStatus.response?.can_attempt

  const needsKyc =
    canAttemptKyc &&
    ['NOT_STARTED', 'TRY_AGAIN', 'IN_PROGRESS'].includes(kycStatus.status)

  const approvalStatusChip = useApprovalStatusChip({
    status:
      kycStatus.status === 'SUCCESS' || canAttemptKyc
        ? kycStatus.status
        : 'AIRDROP_INELIGIBLE',
    kycConfig: kycConfig,
    details: kycStatus.response?.can_attempt_reason ?? undefined,
  })

  const userAddress = kycStatus.response?.public_address

  if (isLoading || !kycConfig || !userAllTimeMetrics || kycStatus.loading) {
    return <Loader />
  }

  return (
    <div className={clsx('min-h-screen', 'flex', 'flex-col', 'font-favorit')}>
      <Head>
        <title>Testnet Rewards</title>
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
        <div className={clsx('mx-6', 'px-3', 'w-full', 'lg:w-2/3', 'mb-6')}>
          <div
            className={clsx(
              'flex',
              'flex-col',
              'md:flex-row',
              'mb-32',
              'w-full'
            )}
          >
            <div className={clsx('flex', 'flex-col', 'w-full')}>
              <div className={clsx('mb-8', 'mt-16')}>
                <Link href="/dashboard">
                  <a className={clsx('flex', 'items-center', 'gap-2')}>
                    <BackArrow />
                    <span>Back to Dashboard</span>
                  </a>
                </Link>
              </div>
              <Box>
                <div className={clsx('p-5', 'md:p-16')}>
                  <div
                    className={clsx(
                      'md:items-center',
                      'flex',
                      'justify-between',
                      'mb-8',
                      'items-start'
                    )}
                  >
                    <div className={clsx('flex', 'flex-col', 'py-3')}>
                      <h1
                        className={clsx(
                          'md:text-5xl',
                          'md:mb-4',
                          'text-2xl',
                          'mb-2',
                          'font-extended'
                        )}
                      >
                        Testnet Rewards
                      </h1>
                      <p className={clsx('text-xl', 'md:text-2xl', 'mt-auto')}>
                        {metadata?.graffiti || '—'}
                      </p>
                      {userAddress && (
                        <div className={clsx('mt-4', 'mr-4')}>
                          <WalletAddress address={userAddress} />
                        </div>
                      )}
                    </div>
                    <FishAvatar color="pink" />
                  </div>
                  <h2 className={clsx('text-3xl', 'mb-8')}>KYC</h2>
                  <Box>
                    <div
                      className={clsx(
                        'md:justify-between',
                        'md:p-8',
                        'gap-6',
                        'items-stretch',
                        'flex-col',
                        'flex',
                        'p-6'
                      )}
                    >
                      <div className={clsx('flex', 'items-center')}>
                        <div className={clsx('order-1 md:order-none')}>
                          {approvalStatusChip}
                        </div>
                      </div>
                      {needsKyc && (
                        <>
                          <ul className={clsx('list-disc', 'px-4')}>
                            <li>
                              Please complete your KYC form to become eligible
                              for your $IRON airdrop.
                            </li>
                            <li>
                              If your KYC form is not submitted by the noted
                              deadlines, your rewards will be lost.
                            </li>
                            <li>
                              You can only attempt this form {kycMaxAttempts}{' '}
                              times. Please do not abandon the flow if possible.
                            </li>
                          </ul>
                          <div
                            className={clsx('flex', 'items-center', 'gap-4')}
                          >
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
                              View KYC FAQ
                            </Button>
                            <Button
                              onClick={() => {
                                router.push('/dashboard/verify')
                              }}
                            >
                              Complete KYC Form
                            </Button>
                            {kycAttempts > 0 && (
                              <p className="ml-4">
                                Attempts: {kycAttempts} / {kycMaxAttempts}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </Box>
                  <div className="mb-16" />
                  <h2 className={clsx('text-3xl', 'mb-8')}>Your Rewards</h2>
                  <div className={clsx('flex', 'flex-col', 'gap-y-4')}>
                    {kycConfig.data.map((pool, i) => {
                      return (
                        <RewardItem
                          key={i}
                          poolName={pool.name}
                          points={userAllTimeMetrics.pool_points[pool.name]}
                          iron={
                            userAllTimeMetrics.pool_points[pool.name] ? null : 0
                          }
                          chips={
                            <>
                              {kycStatus.status !== 'SUCCESS' && (
                                <InfoChip variant="warning">
                                  KYC Deadline:{' '}
                                  {format(
                                    new Date(pool.kyc_completed_by),
                                    'MMM dd'
                                  )}
                                </InfoChip>
                              )}

                              {kycStatus.status !== 'SUCCESS' &&
                              isPast(new Date(pool.kyc_completed_by)) ? (
                                <InfoChip variant="warning">
                                  Airdrop: Forfeit
                                </InfoChip>
                              ) : (
                                <InfoChip variant="info">
                                  Airdrop:{' '}
                                  {format(
                                    new Date(pool.airdrop_completed_by),
                                    'MMM dd'
                                  )}
                                </InfoChip>
                              )}
                            </>
                          }
                        />
                      )
                    })}
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
