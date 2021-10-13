import { useState, useEffect, useCallback } from 'react'

import { ToastOptions, ToastCallProps, Toast } from 'components/Toast'

export function useToast(opts: ToastOptions = {}) {
  const { duration = 3e3, persist = false } = opts
  const [$visible, $setVisible] = useState<boolean>(true)
  useEffect(
    function _show() {
      let timeoutId: ReturnType<typeof setTimeout>
      if (!persist && duration) {
        timeoutId = setTimeout(() => $setVisible(false), duration)
      }
      return () => clearTimeout(timeoutId)
    },
    [$setVisible, duration, persist]
  )
  const Notification = ({ message, action, actionLabel }: ToastCallProps) => (
    <Toast
      visible={$visible}
      message={message}
      action={action}
      actionLabel={actionLabel}
    />
  )
  return {
    visible: $visible,
    Toast: Notification,
  }
}

export default useToast
