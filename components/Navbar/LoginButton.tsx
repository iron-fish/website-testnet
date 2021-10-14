import Link from 'next/link'
import { RawButton } from 'components/Button'
import { LoginContext } from 'contexts/LoginContext'

export const LoginButton = () => {
  return (
    <LoginContext.Consumer>
      {({ status, checkLoggedIn, error, metadata }) => {
        // eslint-disable-next-line
        console.log({ status, metadata, error })
        if (error) {
          // TODO: Find a way to resolve this better, but keep for now
          // eslint-disable-next-line
          console.log({ error, status })
          return null
        }
        const goto =
          checkLoggedIn() && metadata && metadata.id
            ? `/users/${metadata.id}`
            : '/login'
        return (
          <RawButton
            className="text-2xl md:text-base h-16 md:h-12 md:ml-4 py-3 px-6 text-center"
            colorClassName="bg-transparent text-black hover:bg-black hover:text-white"
          >
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
          </RawButton>
        )
      }}
    </LoginContext.Consumer>
  )
}
export default LoginButton
