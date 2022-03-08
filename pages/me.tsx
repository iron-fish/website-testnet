import { Props, User } from './users/[id]'

export function Me({ loginContext }: Props) {
  return <User loginContext={loginContext} startTab="settings" />
}

export default Me
