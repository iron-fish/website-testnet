export interface ToastOptions {
  persist?: boolean
  duration?: number
}

export interface ToastCallProps {
  message: string
  action?: () => unknown
  actionLabel?: string
}

export interface ConditionalToastProps extends ToastCallProps {
  visible: boolean
}
