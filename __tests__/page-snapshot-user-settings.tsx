import User from 'pages/users/[...details]'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from 'jest.utils'
import fetch from 'jest-fetch-mock'
import { FIXTURE } from './page-snapshot-user'

const goodResponse = {
  status: 200,
  headers: { 'Content-Type': 'application/json' },
}
beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(async (req: Request) => {
    const matches = (x: string) => ~req.url.indexOf(x)
    const endsWith = (x: string) => req.url.endsWith(x)
    const body = endsWith('/users/111')
      ? FIXTURE.user
      : matches('/events?')
      ? FIXTURE.events
      : endsWith('granularity=lifetime')
      ? FIXTURE.allTimeMetrics
      : matches('/metrics?granularity=total')
      ? FIXTURE.weeklyMetrics
      : matches('/metrics/config')
      ? FIXTURE.metricsConfig
      : { error: "You haven't implemented this route yet" }
    // console.log({ url: req.url, body, init: goodResponse })
    return Promise.resolve({ body: JSON.stringify(body), init: goodResponse })
  })
})

it('renders User Settings page', async () => {
  try {
    const { container } = render(User, {
      router: {
        pathname: '/users/111/settings',
        route: '/users/111/settings',
        asPath: '/users/111/settings',
        query: { details: ['111', 'settings'] },
      },
    })
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('alert', { name: 'Loading' })
    )
    expect(container).toMatchSnapshot()
  } catch (e) {
    console.warn('cool', e)
  }
})
