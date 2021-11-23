import { NextPageContext } from 'next'
import { Magic } from '@magic-sdk/admin'

// SERVER SIDE
const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '')

type TravelPath = {
  ifLoggedIn?: string
  ifLoggedOut?: string
}

export function protectedRoute({ ifLoggedIn, ifLoggedOut }: TravelPath) {
  async function _visit(context: NextPageContext) {
    // eslint-disable-next-line
    console.log('visiting?', context)
    const auth = (context.req?.headers?.authorization || '').substr(7)
    // eslint-disable-next-line
    console.log('✨', { magic, auth, headers: context?.req?.headers })
    if (auth && auth.length > 0) {
      await magic.token.validate(auth)
      return { redirect: { destination: ifLoggedIn || ifLoggedOut } }
    }
    return { props: {} }
  }
  // eslint-disable-next-line
  console.log('the visitor', _visit, { ifLoggedIn, ifLoggedOut })
  return _visit
}
export default protectedRoute
