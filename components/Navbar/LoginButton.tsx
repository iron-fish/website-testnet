import Link from 'next/link'
import { RawButton } from 'components/Button'
import useLogin from 'hooks/useLogin'

export const LoginButton = () => {
  const { metadata } = useLogin()
  // eslint-disable-next-line
  // @ts-ignore
  const hasTag = metadata && metadata.graffiti ? metadata.graffiti : false
  // eslint-disable-next-line
  // @ts-ignore
  const goto = hasTag ? `/users/${metadata.id}` : `/login`
  const linkText = hasTag ? (
    // eslint-disable-next-line
    // @ts-ignore
    metadata.graffiti
  ) : (
    <span>
      Login<span className="md:hidden"> to Testnet</span>
    </span>
  )
  return (
    <RawButton
      className="text-2xl md:text-base h-16 md:h-12 md:ml-4 py-3 px-6 text-center"
      colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
    >
      <Link href={goto}>
        <a>{linkText}</a>
      </Link>
    </RawButton>
  )
}
export default LoginButton
