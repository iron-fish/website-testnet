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
import useUserPointsByPhase from 'hooks/useUserPointsByPhase'
import { useRouter } from 'next/router'

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

  if (isLoading || !userPointsByPhase) {
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
                        JimboJamboJames
                      </p>
                    </div>
                    <FishAvatar color="pink" />
                  </div>
                  <h2 className={clsx('text-3xl', 'mb-8')}>KYC</h2>
                  <Box>
                    <div
                      className={clsx(
                        'md:flex-row',
                        'md:items-center',
                        'md:justify-between',
                        'md:gap-0',
                        'md:p-8',
                        'gap-6',
                        'items-start',
                        'flex-col',
                        'flex',
                        'p-6'
                      )}
                    >
                      <div className={clsx('order-1 md:order-none')}>
                        <InfoChip variant="pending">KYC Processing</InfoChip>
                      </div>
                      <p className={clsx('text-sm', 'md:ml-5', 'mr-auto')}>
                        Airdrop address: 0000...0000...0000
                      </p>
                      <div className={clsx('order-3 md:order-none')}>
                        <Button
                          onClick={() => {
                            router.push('/dashboard/verify')
                          }}
                        >
                          View KYC Form
                        </Button>
                      </div>
                    </div>
                  </Box>
                  <div className="mb-16" />
                  <h2 className={clsx('text-3xl', 'mb-8')}>Your Rewards</h2>
                  <div className={clsx('flex', 'flex-col', 'gap-y-4')}>
                    <RewardItem
                      phase={0}
                      points={userPointsByPhase.openSource}
                      iron={null}
                      chips={
                        <>
                          <InfoChip variant="warning">
                            KYC Deadline: March 13
                          </InfoChip>
                          <InfoChip variant="info">Airdrop: March 16</InfoChip>
                        </>
                      }
                    />
                    <RewardItem
                      phase={1}
                      points={userPointsByPhase.phase1}
                      iron={null}
                      chips={
                        <>
                          <InfoChip variant="info">
                            KYC Deadline: March 13
                          </InfoChip>
                          <InfoChip variant="info">Airdrop: March 16</InfoChip>
                        </>
                      }
                    />
                    <RewardItem
                      phase={2}
                      points={userPointsByPhase.phase2}
                      iron={null}
                      chips={
                        <>
                          <InfoChip variant="info">
                            KYC Deadline: March 13
                          </InfoChip>
                          <InfoChip variant="info">Airdrop: March 16</InfoChip>
                        </>
                      }
                    />
                    <RewardItem
                      phase={3}
                      points={userPointsByPhase.phase3}
                      iron={null}
                      chips={
                        <>
                          <InfoChip variant="info">
                            KYC Deadline: March 13
                          </InfoChip>
                          <InfoChip variant="info">Airdrop: March 16</InfoChip>
                        </>
                      }
                    />
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
