import Link from 'next/link'

export const LoginCTA = () => (
  <div className="text-center text-xl py-8">
    Have an account?{' '}
    <Link href="/login">
      <a className="text-iflightblue">Log In</a>
    </Link>
  </div>
)
export default LoginCTA
