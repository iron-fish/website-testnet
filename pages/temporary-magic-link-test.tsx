import { useProtectedRoute } from 'hooks/useProtectedRoute'
import Debug from 'components/Debug'

const Test = () => {
  const deets = useProtectedRoute({})
  return <Debug {...deets} />
}

export default Test
