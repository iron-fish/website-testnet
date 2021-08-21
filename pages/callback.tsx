import { useEffect } from 'react'
import Router from 'next/router'
import Loader from 'components/Loader'
import { tokenLogin } from 'apiClient/client'

const Callback = () => {
  useEffect(() => {
    const call = async () => {
      const res = await tokenLogin()
      if ('authenticated' in res) {
        Router.push('/')
      }
    }
    call()
  }, [])
  return <Loader />
}

export default Callback
