import Link from 'next/link'
import Button from 'components/Button'
import useLogin from 'hooks/useLogin'

export const LoginButton = () => {
  const { metadata } = useLogin()
  // eslint-disable-next-line
  // @ts-ignore
  const hasTag = metadata && metadata.graffiti ? metadata.graffiti : false
  // eslint-disable-next-line
  // @ts-ignore
  const goto = hasTag ? `/users/${metadata.id}` : `/login`
  // eslint-disable-next-line
  // @ts-ignore
  const linkText = hasTag ? metadata.graffiti : 'Login'
  return (
    <Button
      className="h-12 ml-4 py-3 px-6 text-center"
      colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
    >
      <Link href={goto}>
        <a>{linkText}</a>
      </Link>
    </Button>
  )
}
export default LoginButton
