import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoginContext } from './useLogin'

export default function useRequireLogin(loginContext: LoginContext) {
  const { checkLoggedIn, checkLoading } = loginContext
  const router = useRouter()

  const isLoading = checkLoading()
  const isLoggedIn = checkLoggedIn()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login')
    }
  }, [isLoading, isLoggedIn, router])
}
