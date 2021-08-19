import { useEffect } from 'react'
import Router from 'next/router'
import Loader from 'components/Loader'
import { tokenLogin } from 'apiClient/client'

const Callback = () => {
  useEffect(() => {
    const call = async () => {
      const res = await tokenLogin()
      // eslint-disable-next-line no-console
      console.log('TOKEN RES', res)
      if (res && 'statusCode' in res && res.statusCode === 200) {
        Router.push('/')
      }
    }
    call()
  }, [])
  return <Loader />
}

export default Callback
