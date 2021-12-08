import { ReactType, createElement } from 'react'
import '@testing-library/jest-dom'
import { useLocalLogin } from 'hooks/useLocalLogin'
import { screen, render as defaultRender } from '@testing-library/react'
import { jest } from '@jest/globals'

import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NextRouter } from 'next/router'

export type DefaultParams = Parameters<typeof defaultRender>
export type RenderUI = DefaultParams[0]
export type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> }

const here = '/'

// via next/dist/shared/lib/router/router.d.ts
const mockRouter: NextRouter = {
  // BaseRouter
  route: here,
  pathname: here,
  query: {},
  asPath: here,
  basePath: '',
  isLocaleDomain: false,
  // NextRouter
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
}

const fallbackGlobalObject = {}
export function isNodeEnv(): boolean {
  return (
    Object.prototype.toString.call(
      typeof process !== 'undefined' ? process : 0
    ) === '[object process]'
  )
}

export function getGlobalObject<T>(): T {
  return (
    isNodeEnv()
      ? global
      : typeof window !== 'undefined'
      ? window
      : typeof self !== 'undefined'
      ? self
      : fallbackGlobalObject
  ) as T
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
export const rasterizeWithProps = (C: ReactType, props: Record<string, any>) =>
  createElement(C, props, props.children || [])

export const makeRendererFor = (C: ReactType) => (props: Record<string, any>) =>
  defaultRender(rasterizeWithProps(C, props))
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable react/display-name */

const wrapWithRouter = (router: Partial<NextRouter> | undefined) =>
  function MockRouterWrapped({ children }: { children: React.ReactNode }) {
    return rasterizeWithProps(RouterContext.Provider, {
      value: router,
      children,
    })
  }

export function renderWithRouter(ui: RenderUI, opts: RenderOptions = {}) {
  const { router: rawRouter, ...options } = opts
  const router = { ...mockRouter, ...rawRouter }
  const { wrapper = wrapWithRouter(router) } = opts
  return {
    ...defaultRender(ui, { wrapper, ...options }),
    router,
  }
}

export function render(C: ReactType, options: RenderOptions = {}) {
  const Wrapped = () => {
    const loginContext = useLocalLogin()
    return <C loginContext={loginContext} />
  }
  return renderWithRouter(<Wrapped />, options)
}

export function snapshot(C: ReactType, options: RenderOptions = {}) {
  const rendered = render(C, options)
  // ensure we're not snapshotting a Loader
  const result = screen.queryByRole('alert', { name: 'Loading' })
  expect(result).not.toBeInTheDocument()
  return rendered
}

export function autoSnapshot(C: ReactType) {
  return () => {
    const { container } = snapshot(C)
    expect(container).toMatchSnapshot()
  }
}

// export const mockFetch = lookupFn => jest.fn().mockImplementation(lookupFn)
