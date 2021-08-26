import { useEffect } from 'react'
import Loader from 'components/Loader'
import { tokenLogin } from 'apiClient/client'

const Callback = () => {
  useEffect(() => {
    const call = async () => {
      const res = await tokenLogin()
      // eslint-disable-next-line
      console.log({ res })
      if ('authenticated' in res) {
        if (typeof window !== 'undefined') {
          window.close()
        }
      }
    }
    call()
  }, [])
  return <Loader />
}

export default Callback
