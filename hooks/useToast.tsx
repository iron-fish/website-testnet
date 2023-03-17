import { useState, useEffect, useCallback } from 'react'
import useQuery from './useQuery'

import { ToastOptions } from 'components/Toast'
import { QueriedToastOptions } from 'components/Toast/types'

// for convenience porpoises
export { Toast, Alignment } from 'components/Toast'

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

// window only, we don't care, just like ballmer
const decode = (x: string) => (typeof window !== 'undefined' ? atob(x) : x)

export function useQueriedToast(opts: QueriedToastOptions = {}) {
  const { queryString = 'toast' } = opts
  const $rawToast = useQuery(queryString) || ''
  const $persist = useQuery('persist') || ''
  const toasted = useToast({
    ...opts,
    persist: $persist.split('=')[0] === 'true',
  })
  const { visible, show } = toasted
  const [$message, $setMessage] = useState('')

  useEffect(() => {
    $setMessage($rawToast.split('=').map(decode).join(''))
  }, [$rawToast])
  return {
    setMessage: $setMessage,
    message: $message,
    visible,
    show,
  }
}

/*
// EXAMPLE USAGE

import { useQueriedToast, Toast, Alignment } from 'hooks/useToast'

// in your component:

const { visible: $visible, message: $toast } = useQueriedToast({
  queryString: 'toast',
  duration: 8e3,
})

// in your jsx:
<Toast message={$toast} visible={$visible} alignment={Alignment.Top} />
*/

export default useToast
