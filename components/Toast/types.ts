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

export enum Alignment {
  Top,
  Bottom,
}

export interface ConditionalToastProps extends ToastCallProps {
  alignment: Alignment
  visible: boolean
}

export interface QueriedToastOptions extends ToastOptions {
  queryString?: string
}
