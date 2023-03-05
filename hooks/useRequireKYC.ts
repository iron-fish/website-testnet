import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoginContext } from './useLogin'

export default function useRequireKYC(loginContext: LoginContext) {
  const { checkLoggedIn, checkLoading, metadata } = loginContext
  const router = useRouter()

  const isLoading = checkLoading()
  const isLoggedIn = checkLoggedIn()

  useEffect(() => {
    if (!isLoading && !isLoggedIn && metadata && !metadata.enable_kyc) {
      router.replace('/')
    }
  }, [isLoading, isLoggedIn, router, metadata])
}
