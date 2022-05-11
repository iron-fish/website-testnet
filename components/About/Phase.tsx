import { ReactType, ReactElement } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import OffsetBox from 'components/OffsetBorder/Box'
import CheckIcon from 'components/icons/Check'

import { Status } from './types'

export type Pool = {
  size: number
  categories: string[]
}

export type PhaseProps = {
  index: number
  summary: ReactType | ReactElement | string
  pools: Pool[]
  status?: Status
}

export const cumulativePoolSize = (pools: Pool[]) =>
  pools.reduce((sum, { size }) => sum + size, 0).toLocaleString()

export const Phase = ({
  index,
  summary,
  pools,
  status = Status.Active,
}: PhaseProps) => {
  const isComplete = status === Status.Ended
  return (
    <OffsetBox behind="bg-ifpink" className={clsx('mt-3', 'md:mr-6', 'w-full')}>
      <div
        className={clsx(
          'h-[34rem]',
          'lg:h-[36rem]',
          'font-favorit',
          'flex',
          'flex-col',
          'items-center',
          'p-13'
        )}
      >
        <h4
          className={clsx(
            'text-4xl',
            'font-extended',
            'mb-2',
            'w-full',
            'text-left'
          )}
        >
          Phase {index}
        </h4>
        <p className={clsx('my-2', 'text-left', 'w-full', 'text-lg')}>
          Prize pool of {cumulativePoolSize(pools)} total coins
        </p>
        <p className={clsx('text-left', 'w-full')}>{summary}</p>
        <Link href={isComplete ? '#' : '/signup'} passHref>
          <a
            className={clsx(
              'rounded-3xl',
              isComplete ? 'bg-[#d7eacf]' : 'bg-black',
              isComplete ? 'hover:bg-[#d7eacf]' : 'hover:bg-transparent',
              isComplete ? 'cursor-not-allowed' : 'cursor-pointer',
              isComplete ? 'text-[#389810]' : 'text-white',
              isComplete ? 'hover:text-[#389810]' : 'hover:text-black',
              isComplete ? 'border-[#389810]' : `border-2`,
              'w-full',
              'mt-4',
              `flex`,
              `justify-center`,
              `items-center`,
              `font-extended`,
              `rounded-full`,
              `whitespace-nowrap`,
              `transition`,
              `border-black`,
              `p-4`,
              `h-10`
            )}
            onClick={e => (isComplete ? e.preventDefault() : true)}
          >
            {isComplete ? (
              <>
                <CheckIcon />
                <span className={clsx('ml-1')}>Phase Complete</span>
              </>
            ) : (
              <>Sign Up Now</>
            )}
          </a>
        </Link>
        {pools.map(({ size, categories }: Pool) => (
          <div
            key={`${size}-${categories.length}`}
            className={clsx('mt-6', 'w-full', 'text-left')}
          >
            Categories sharing {size.toLocaleString()} coins
            <ul className="pl-5">
              {categories.map((category: string) => (
                <li key={category} className={clsx('list-disc', 'pt-2')}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </OffsetBox>
  )
}

export default Phase
