export interface ToastOptions {
  persist?: boolean
  duration?: number
}

export interface ToastCallProps {
  visible: boolean
  message: string
  action?: () => unknown
  actionLabel?: string
}

export interface ConditionalToastProps extends ToastCallProps {
  visible: boolean
}

export interface QueriedToastOptions extends ToastOptions {
  queryString?: string
}
