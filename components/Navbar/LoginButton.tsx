import Link from 'next/link'
import clsx from 'clsx'
import { RawButton } from 'components/Button'
import { LoginContext } from 'contexts/LoginContext'
// import { useState, useEffect } from 'react'

export const LoginButton = () => (
  <LoginContext.Consumer>
    {({ checkLoggedIn, metadata }) => {
      const loggedIn = checkLoggedIn()

      const goto =
        loggedIn && metadata && metadata.id ? `/users/${metadata.id}` : '/login'
      const hasGraffiti = metadata && !!metadata.graffiti
      return (
        <RawButton
          className={clsx(
            'text-2xl',
            'md:text-base',
            'h-16',
            'md:h-12',
            'md:ml-4',
            'py-3',
            'px-6',
            'text-center'
          )}
          colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
        >
          <Link href={goto}>
            <a>
              {hasGraffiti ? (
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                metadata!.graffiti
              ) : (
                <span>
                  Login<span className="md:hidden"> to Testnet</span>
                </span>
              )}
            </a>
          </Link>
        </RawButton>
      )
    }}
  </LoginContext.Consumer>
)
export default LoginButton
