import Link from 'next/link'

export const FinePrint = () => (
  <span className="font-favorit p-2 max-w-md text-sm text-center">
    By clicking on sign up, you agree to Iron Fish&apos;s{' '}
    <Link href="/about#guidelines">
      <a className="text-iflightblue">Testnet Guidelines.</a>
    </Link>
  </span>
)
export default FinePrint
