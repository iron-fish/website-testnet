import { useState, useEffect, useCallback } from 'react'
import useQuery from './useQuery'

import { ToastOptions } from 'components/Toast'
import { QueriedToastOptions } from 'components/Toast/types'

export function useToast(opts: ToastOptions = {}) {
  const { duration = 3e3, persist = false } = opts
  const [$visible, $setVisible] = useState<boolean>(false)
  function _show() {
    $setVisible(true)
    let timeoutId: ReturnType<typeof setTimeout>
    if (!persist && duration) {
      timeoutId = setTimeout(() => $setVisible(false), duration)
    }
    return () => clearTimeout(timeoutId)
  }
  useEffect(_show, [$setVisible, duration, persist])
  return {
    visible: $visible,
    show: useCallback(_show, [$setVisible, duration, persist]),
  }
}

export function useQueriedToast(opts: QueriedToastOptions = {}) {
  const { queryString = 'toast' } = opts
  const $toast = useQuery(queryString) || ''
  const toasted = useToast(opts)
  return { message: $toast, visible: toasted.visible, show: toasted.show }
}

export default useToast
