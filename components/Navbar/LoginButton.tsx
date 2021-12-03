import { useState, ReactNode, MouseEventHandler } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { LoginContext } from 'contexts/LoginContext'

// TODO: disable this before merging!
import useQuery from 'hooks/useQuery'

import ChevronDown from './ChevronDown'
import { ApiUserMetadata } from 'apiClient/types'
import styles from './LoginButton.module.css'

type ButtonProps = {
  children: ReactNode
  colorClassName?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onMouseOver?: MouseEventHandler<HTMLButtonElement>
  onMouseOut?: MouseEventHandler<HTMLButtonElement>
  border?: string
}
export const RawButton = ({
  children,
  className = '',
  border = `border-2`,
  onMouseOver,
  onMouseOut,
}: ButtonProps) => {
  return (
    <button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={clsx(
        styles.buttonRoot,
        `flex`,
        `justify-center`,
        `items-center`,
        `font-extended`,
        `rounded-full`,
        `whitespace-nowrap`,
        `transition`,
        `border-black`,
        border,
        className
      )}
    >
      {children}
    </button>
  )
}
type StaticProps = {
  href: string
}

const StaticButton = ({ href }: StaticProps) => (
  <Link href={href}>
    <a>
      <span>
        Login<span className="md:hidden"> to Testnet</span>
      </span>
    </a>
  </Link>
)

interface ApiUserMetadataUI extends ApiUserMetadata {
  visible: boolean
}

const HitState = () => <div className={styles.hitState} />

const UserButton = ({ id, graffiti, visible }: ApiUserMetadataUI) => (
  <div className={clsx(styles.userButton, 'relative', 'flex')}>
    <div
      className={clsx(
        'md:pt-[0.1rem]',
        'md:max-w-[4rem]',
        'lg:max-w-[8rem]',
        'xl:max-w-[20rem]',
        'md:overflow-x-hidden',
        'md:overflow-y-visible',
        'md:truncate',
        'md:relative'
      )}
    >
      <Link href={`/users/${id}`} passHref>
        <div className={clsx('truncate', 'relative', 'max-w-[30rem]')}>
          {graffiti}
        </div>
      </Link>
    </div>
    <ChevronDown />
    <Link href="/logout" passHref>
      <a
        className={clsx(
          styles.arrowed,
          { 'md:hidden': !visible },
          'z-50',
          'px-6',
          'py-3',
          'mt-12',
          'w-full',
          'm-auto',
          'bg-white',
          'text-black',
          'md:w-auto',
          'md:mx-0',
          // 'md:w-[7rem]',
          'md:rounded-full',
          'md:hover:bg-black',
          'md:hover:text-white',
          'md:border',
          'md:border-black'
        )}
      >
        Sign Out
        <HitState />
      </a>
    </Link>
  </div>
)

export const LoginButton = () => {
  // TODO: disable this before merging!
  const $cheat = useQuery('cheat')
  // coerce to boolean
  const cheat = !!$cheat
  const [$visible, $setVisible] = useState<boolean>(false)
  const set = (x: boolean) => () => $setVisible(x)
  const on = set(true)
  const off = set(false)
  return (
    <LoginContext.Consumer>
      {({ checkLoggedIn, metadata: rawMetadata }) => {
        const metadata = cheat
          ? {
              // graffiti: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
              graffiti: 'a',
              id: 420,
              created_at: Date.now(),
              updated_at: Date.now(),
            }
          : rawMetadata
        const isLoggedIn = checkLoggedIn() || cheat
        // eslint-disable-next-line
        const meta = metadata as any
        const hasGraffiti = (metadata && !!metadata.graffiti) || cheat
        return (
          <RawButton
            className={clsx(
              'text-2xl',
              'md:text-sm',
              'lg:text-base',
              'h-16',
              'md:h-12',
              'md:ml-4',
              'py-3',
              'px-6',
              'md:px-3',
              'lg:px-6',
              'text-center',
              'bg-transparent',
              'text-black',
              'hover:bg-black',
              'hover:text-white'
            )}
            onMouseOver={on}
            onMouseOut={off}
          >
            {isLoggedIn && hasGraffiti ? (
              <UserButton {...meta} visible={$visible} />
            ) : (
              <StaticButton href="/login" />
            )}
          </RawButton>
        )
      }}
    </LoginContext.Consumer>
  )
}
export default LoginButton
