import { useState, ReactNode, MouseEventHandler } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { LoginContext } from 'hooks/useLogin'

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
export const HoverButton = ({
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
  <Link href={href} passHref>
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
  <div
    className={clsx(
      styles.userButton,
      'absolute',
      'flex',
      'flex-col',
      'top-[0.75rem]',
      'pointer-events-none',
      'md:pointer-events-auto',
      'md:top-[0.6rem]',
      'lg:top-[0.5rem]'
    )}
  >
    <div
      className={clsx(
        'flex',
        'flex-row',
        'content-around',
        'justify-center',
        'md:justify-end',
        'lg:justify-center'
      )}
    >
      <div
        className={clsx(
          styles.userButtonSpan,
          'md:pt-[0.1rem]',
          'md:min-w-[5.1rem]',
          'md:w-[5.1rem]',
          'lg:w-[7rem]',
          'xl:max-w-[20rem]',
          'md:overflow-x-hidden',
          'md:overflow-y-visible',
          'md:truncate',
          'md:relative'
        )}
      >
        <Link href={`/users/${id}`} passHref>
          <div className={clsx('truncate', 'relative', 'max-w-[20rem]')}>
            {graffiti}
          </div>
        </Link>
      </div>
      <ChevronDown />
    </div>
    <Link href="/logout" passHref>
      <a
        className={clsx(
          styles.arrowed,
          'md:hidden',
          'md:opacity-0',
          { 'md:opacity-100': visible },
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
type LoginProps = {
  loginContext: LoginContext
}
export const LoginButton = ({ loginContext }: LoginProps) => {
  const [$visible, $setVisible] = useState<boolean>(false)
  const set = (x: boolean) => () => $setVisible(x)
  const on = set(true)
  const off = set(false)
  const { checkLoggedIn, metadata } = loginContext
  const isLoaded = checkLoggedIn()
  // eslint-disable-next-line
  const meta = metadata as any
  return (
    <HoverButton
      className={clsx(
        'bg-transparent',
        'h-16',
        'hover:bg-black',
        'hover:text-white',
        'px-6',
        'py-3',
        'relative',
        'text-2xl',
        'text-black',
        'text-center',
        'md:min-w-[8rem]',
        'md:h-12',
        'md:ml-4',
        'md:px-3',
        'md:text-sm',
        'lg:min-w-[10rem]',
        'lg:px-6',
        'lg:text-base'
      )}
      onMouseOver={on}
      onMouseOut={off}
    >
      {isLoaded ? (
        <UserButton {...meta} visible={$visible} />
      ) : (
        <StaticButton href="/login" />
      )}
    </HoverButton>
  )
}
export default LoginButton
