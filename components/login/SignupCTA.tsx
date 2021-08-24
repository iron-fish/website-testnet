import Link from 'next/link'

export const SignupCTA = () => (
  <div className="text-center text-xl py-8">
    Don&apos;t yet have an account?{' '}
    <Link href="/signup">
      <a className="text-iflightblue">Sign Up</a>
    </Link>
  </div>
)
export default SignupCTA
