import Link from 'next/link'
import Button from 'components/Button'

export const LoginButton = () => {
  return (
    <Button
      className="h-12 ml-4 py-3 px-6 text-center"
      colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
    >
      <Link href="/login">
        <a>Login</a>
      </Link>
    </Button>
  )
}
export default LoginButton
