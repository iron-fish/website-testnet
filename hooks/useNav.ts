import { useCallback, useEffect, useState } from 'react'

export enum NavState {
  COMPANY = 'company',
  TESTNET = 'testnet',
}

export function useNav() {
  const [$flyoutVisible, $setFlyoutVisible] = useState(false)
  const [$subnavState, $setSubnavState] = useState<null | NavState>(null)

  const hideNav = useCallback(() => {
    $setFlyoutVisible(false)
    $setSubnavState(null)
  }, [$setSubnavState, $setFlyoutVisible])

  useEffect(() => {
    if ($flyoutVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [$flyoutVisible])

  const isCompanyVisible = useCallback(
    () => $subnavState === NavState.COMPANY,
    [$subnavState]
  )

  const isTestnetVisible = useCallback(
    () => $subnavState === NavState.TESTNET,
    [$subnavState]
  )

  const toggleNavCompany = useCallback(
    () => $setSubnavState(isCompanyVisible() ? null : NavState.COMPANY),
    [$setSubnavState, isCompanyVisible]
  )

  const toggleNavTestnet = useCallback(
    () => $setSubnavState(isTestnetVisible() ? null : NavState.TESTNET),
    [$setSubnavState, isTestnetVisible]
  )

  return {
    $flyoutVisible,
    $setFlyoutVisible,
    $subnavState,
    $setSubnavState,
    hideNav,
    toggleNavCompany,
    toggleNavTestnet,
    isTestnetVisible,
    isCompanyVisible,
  }
}
export default useNav
