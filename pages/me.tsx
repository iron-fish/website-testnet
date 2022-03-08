import { useRouter } from 'next/router'
import { Props, User } from './users/[id]'
import { encode as btoa } from 'base-64'

export function Me({ loginContext }: Props) {
  const $router = useRouter()
  if (loginContext?.metadata?.id) {
    return <User loginContext={loginContext} startTab="settings" />
  } else {
    return $router.push(
      `/login?toast=${btoa('You must be logged in to see that page.')}`
    )
  }
}

export default Me
