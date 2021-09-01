import { useEffect, useState } from 'react'

import Link from 'next/link'
import { RawButton } from 'components/Button'
import Loader from 'components/Loader'
import { useLogin } from 'hooks/useLogin'

enum STATUS {
  LOADING = 'loading',
  FAILED = 'failed',
  LOADED = 'loaded',
}

export const LoginButton = () => {
  const [$status, $setStatus] = useState<STATUS>(STATUS.LOADING)
  const { metadata, error } = useLogin()
  useEffect(() => {
    if (error || (metadata && !metadata.graffiti)) {
      // eslint-disable-next-line
      console.log({ error, metadata })
      $setStatus(STATUS.FAILED)
    } else {
      $setStatus(STATUS.LOADED)
    }
  }, [metadata, error])
  const goto = metadata && metadata.id ? `/users/${metadata.id}` : '/login'
  return (
    <RawButton
      className="text-2xl md:text-base h-16 md:h-12 md:ml-4 py-3 px-6 text-center"
      colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
    >
      {$status === 'loading' ? (
        <Loader />
      ) : (
        <Link href={goto}>
          <a>
            {metadata && metadata.graffiti ? (
              metadata.graffiti
            ) : (
              <span>
                Login<span className="md:hidden"> to Testnet</span>
              </span>
            )}
          </a>
        </Link>
      )}
    </RawButton>
  )
}
export default LoginButton
