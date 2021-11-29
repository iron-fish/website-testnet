import { useProtectedRoute } from 'hooks/useProtectedRoute'
import Debug from 'components/Debug'

const Test = () => {
  const { status } = useProtectedRoute({})
  return <Debug {...{ status }} />
}

export default Test
