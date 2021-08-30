import Link from 'next/link'
import { RawButton } from 'components/Button'

export const LoginButton = () => (
  <RawButton
    className="text-2xl md:text-base h-16 md:h-12 md:ml-4 py-3 px-6 text-center"
    colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
  >
    <Link href="/login">
      <a>
        <span>
          Login<span className="md:hidden"> to Testnet</span>
        </span>
      </a>
    </Link>
  </RawButton>
)
export default LoginButton
