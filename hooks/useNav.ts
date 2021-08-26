import { useCallback, useEffect, useState } from 'react'
// import { debounce } from 'throttle-debounce'

export enum NavState {
  NONE = 'hidden',
  COMPANY = 'company',
  TESTNET = 'testnet',
}

export function useNav() {
  const [$flyoutVisible, $setFlyoutVisible] = useState(false)
  const [$subnavState, $setSubnavState] = useState<NavState>(NavState.NONE)

  const hideNav = useCallback(() => {
    if ($subnavState !== NavState.NONE) {
      $setSubnavState(NavState.NONE)
    }
  }, [$subnavState, $setSubnavState])

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
