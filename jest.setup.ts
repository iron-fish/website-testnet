import { jest } from '@jest/globals'
import { ReactType } from 'react'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'image'
  },
}))

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactType }) =>
      children
)
