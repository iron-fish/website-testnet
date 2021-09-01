import Link from 'next/link'
import { RawButton } from 'components/Button'
import Loader from 'components/Loader'
import { useLogin } from 'hooks/useLogin'

export const LoginButton = () => {
  const { magicMetadata, metadata, error } = useLogin()
  if (error || !metadata || !metadata.graffiti) {
    // eslint-disable-next-line
    console.log({ error, metadata })
    return null
  }
  const goto = metadata && metadata.id ? `/users/${metadata.id}` : '/login'
  return (
    <RawButton
      className="text-2xl md:text-base h-16 md:h-12 md:ml-4 py-3 px-6 text-center"
      colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
    >
      {!magicMetadata && !metadata ? (
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
