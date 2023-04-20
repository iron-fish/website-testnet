import clsx from 'clsx'
import { Box } from 'components/OffsetBorder/Box'
import { InfoChip } from '../InfoChip/InfoChip'
import useClipboard from 'react-use-clipboard'
import styles from './totalRewards.module.css'
import ActivityCopy from 'components/icons/ActivityCopy'

type Props = {
  totalPoints: number | null
  totalIron: number | null
  airdropHash: string | null
}

export const titlesByPhase = {
  pool_three: 'Pull Request Points',
  pool_one: 'Phase 1 Points',
  pool_two: 'Phase 2 Points',
  pool_four: 'Phase 3 Points',
}

const longestPoolName = Object.values(titlesByPhase).sort(
  (a, b) => b.length - a.length
)[0]

export function TotalRewards({ totalPoints, totalIron, airdropHash }: Props) {
  if (!airdropHash) {
    return null
  }

  return (
    <div className="mb-3 w-full">
      <Box behind={'transaprent'} background="bg-black text-white">
        <div
          className={clsx(
            'md:p-8',
            'md:flex-row',
            'md:gap-0',
            'gap-10',
            'flex-col',
            'flex',
            'p-4'
          )}
        >
          <div className="mr-8">
            <div className={clsx('relative')}>
              <div
                aria-hidden
                className={clsx(
                  'text-lg',
                  'text-transparent',
                  'whitespace-nowrap',
                  'select-none'
                )}
              >
                {longestPoolName}
              </div>
              <div
                className={clsx(
                  'text-lg',
                  'absolute',
                  'inset-0',
                  'whitespace-nowrap'
                )}
              >
                Total Points
              </div>
            </div>
            <div className={clsx('flex', 'items-center', 'justify-between')}>
              <h3
                className={clsx(
                  'text-left',
                  'text-3xl',
                  'mt-3',
                  'font-extended'
                )}
              >
                {totalPoints !== null
                  ? totalPoints.toLocaleString('en-US')
                  : 'n/a'}
              </h3>
              <span className={clsx('hidden', 'md:block', 'mt-2')}>=</span>
            </div>
          </div>
          <div>
            <span className={clsx('text-lg')}>Total Rewards</span>
            <h3
              className={clsx('text-left', 'text-3xl', 'mt-3', 'font-extended')}
            >
              {totalIron !== null ? totalIron.toLocaleString('en-US') : 'n/a'}
            </h3>
          </div>
          <div
            className={clsx(
              'flex',
              'flex-col',
              'justify-center',
              'gap-y-2',
              'md:ml-auto'
            )}
          >
            <CopyAirdropHash hash={airdropHash} />
            <ViewInBlockExplorer hash={airdropHash} />
          </div>
        </div>
      </Box>
    </div>
  )
}

function CopyAirdropHash({ hash }: { hash: string }) {
  const [isCopied, setCopied] = useClipboard(hash, {
    successDuration: 4000,
  })

  const { start, end } =
    hash?.match(/^(?<start>.{4}).+(?<end>.{4})$/)?.groups ?? {}
  const truncatedHash = start && end ? `${start}...${end}` : null

  if (!truncatedHash) {
    return null
  }

  return (
    <div
      className={clsx('cursor-pointer', 'relative', styles.copyWrapper)}
      role="button"
      onClick={setCopied}
    >
      <div className={clsx(styles.tooltip)}>
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </div>
      <InfoChip variant="airdrop" className="w-full">
        <div className="flex items-center">
          Airdrop: {truncatedHash}
          <ActivityCopy className="ml-2" color="#5FC89A" />
        </div>
      </InfoChip>
    </div>
  )
}

function ViewInBlockExplorer({ hash }: { hash: string }) {
  return (
    <a
      href={`https://explorer.ironfish.network/transaction/${hash}`}
      target="_blank"
      rel="noreferrer"
    >
      <InfoChip variant="airdrop" className="w-full">
        <div className="flex items-center">
          Block Explorer
          <svg
            className="ml-2"
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={9}
            fill="none"
          >
            <path
              fill="#5FC89A"
              d="m1.633 8.9-.7-.7L7.8 1.333H1.5v-1h8v8h-1v-6.3L1.633 8.9Z"
            />
          </svg>
        </div>
      </InfoChip>
    </a>
  )
}
