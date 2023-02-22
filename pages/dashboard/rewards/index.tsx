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
              <Box>
                <div className={clsx('p-16')}>
                  <div className={clsx('flex', 'justify-between', 'mb-8')}>
                    <div className={clsx('flex', 'flex-col', 'py-3')}>
                      <h1 className={clsx('text-5xl', 'mb-4', 'font-extended')}>
                        Testnet Rewards
                      </h1>
                      <p className={clsx('text-2xl', 'mt-auto')}>
                        JimboJamboJames
                      </p>
                    </div>
                    <FishAvatar color="pink" />
                  </div>
                  <h2 className={clsx('text-3xl', 'mb-8')}>KYC</h2>
                  <Box>
                    <div
                      className={clsx(
                        'p-8',
                        'flex',
                        'justify-between',
                        'items-center'
                      )}
                    >
                      <InfoChip variant="pending">
                        KYC Action Processing
                      </InfoChip>
                      <p className={clsx('text-sm', 'ml-5', 'mr-auto')}>
                        Airdrop address: 0000...0000...0000
                      </p>
                      <Button className="mt-8 md:mt-0">View KYC Form</Button>
                    </div>
                  </Box>
                  <div className="mb-16" />
                  <h2 className={clsx('text-3xl', 'mb-8')}>Your Rewards</h2>
                  <div className={clsx('flex', 'flex-col', 'gap-y-4')}>
                    <RewardItem
                      points={1234}
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
                      points={1234}
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
                      points={1234}
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
                      points={1234}
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
