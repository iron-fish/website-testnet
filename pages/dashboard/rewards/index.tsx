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
import { PhaseKeys, RewardItem } from 'components/Airdrop/RewardItem/RewardItem'
import Link from 'next/link'
import BackArrow from 'components/icons/BackArrow'
import useRequireLogin from 'hooks/useRequireLogin'
import useUserPointsByPhase from 'hooks/useUserPointsByPhase'
import { useRouter } from 'next/router'
import { PHASE_DATES } from 'components/Airdrop/hooks/usePhaseStatus'
import { format, isPast } from 'date-fns'
import { useJumioStatus } from 'components/Airdrop/hooks/useJumioStatus'
import { useApprovalStatusChip } from 'components/Airdrop/hooks/useApprovalStatusChip'

type AboutProps = {
  showNotification: boolean
  loginContext: LoginContext
}

export default function KYC({ showNotification, loginContext }: AboutProps) {
  const { checkLoading, metadata } = loginContext
  const router = useRouter()

  const isLoading = checkLoading()

  useRequireLogin(loginContext)

  const userPointsByPhase = useUserPointsByPhase(metadata?.id)
  const { loading: statusLoading, status } = useJumioStatus()

  const phaseMappings = {
    0: 'openSource',
    1: 'phase1',
    2: 'phase2',
    3: 'phase3',
  } as const

  const approvalStatusChip = useApprovalStatusChip(status.verified)

  if (isLoading || !userPointsByPhase || statusLoading) {
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
                      {!status.verified && (
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
                              You can only attempt this form 3 times. Please do
                              not abandon the flow if possible.
                            </li>
                          </ul>
                          <div
                            className={clsx('flex', 'items-center', 'gap-8')}
                          >
                            <Button
                              onClick={() => {
                                router.push('/dashboard/verify')
                              }}
                            >
                              Complete KYC Form
                            </Button>
                            <p>Attempts: 0 / 3</p>
                          </div>
                        </>
                      )}
                    </div>
                  </Box>
                  <div className="mb-16" />
                  <h2 className={clsx('text-3xl', 'mb-8')}>Your Rewards</h2>
                  <div className={clsx('flex', 'flex-col', 'gap-y-4')}>
                    {Object.entries(PHASE_DATES).map(
                      ([phase, { kycDeadline, airdopDate }]) => {
                        return (
                          <RewardItem
                            key={phase}
                            phase={parseInt(phase) as PhaseKeys}
                            points={
                              userPointsByPhase[
                                phaseMappings[parseInt(phase) as PhaseKeys]
                              ]
                            }
                            iron={null}
                            chips={
                              <>
                                <InfoChip variant="warning">
                                  KYC Deadline: {format(kycDeadline, 'MMM dd')}
                                </InfoChip>
                                {isPast(kycDeadline) ? (
                                  <InfoChip variant="warning">
                                    Airdrop: Forfeit
                                  </InfoChip>
                                ) : (
                                  <InfoChip variant="info">
                                    Airdrop: {format(airdopDate, 'MMM dd')}
                                  </InfoChip>
                                )}
                              </>
                            }
                          />
                        )
                      }
                    )}
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
