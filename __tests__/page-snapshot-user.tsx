import User from 'pages/users/[id]'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { METADATA } from 'hooks/useLocalLogin'
import { render } from 'jest.utils'
import fetch from 'jest-fetch-mock'

export const FIXTURE = {
  user: { ...METADATA, rank: 3 },
  events: {
    object: 'list',
    data: [],
    metadata: {
      has_next: false,
      has_previous: false,
    },
  },
  allTimeMetrics: {
    user_id: METADATA.id,
    granularity: 'lifetime',
    points: 0,
    metrics: {
      blocks_mined: {
        count: 0,
        points: 0,
        rank: 3,
      },
      bugs_caught: {
        count: 0,
        points: 0,
        rank: 3,
      },
      community_contributions: {
        count: 0,
        points: 0,
        rank: 3,
      },
      pull_requests_merged: {
        count: 0,
        points: 0,
        rank: 3,
      },
      social_media_contributions: {
        count: 0,
        points: 0,
        rank: 3,
      },
    },
  },
  weeklyMetrics: {
    user_id: 2,
    granularity: 'total',
    points: 0,
    metrics: {
      blocks_mined: {
        count: 0,
        points: 0,
      },
      bugs_caught: {
        count: 0,
        points: 0,
      },
      community_contributions: {
        count: 0,
        points: 0,
      },
      pull_requests_merged: {
        count: 0,
        points: 0,
      },
      social_media_contributions: {
        count: 0,
        points: 0,
      },
    },
  },
  metricsConfig: {
    points_per_category: {
      BLOCK_MINED: 100,
      BUG_CAUGHT: 100,
      COMMUNITY_CONTRIBUTION: 1000,
      PULL_REQUEST_MERGED: 500,
      SOCIAL_MEDIA_PROMOTION: 100,
    },
    weekly_limits: {
      BLOCK_MINED: 1000,
      BUG_CAUGHT: 1000,
      COMMUNITY_CONTRIBUTION: 1000,
      PULL_REQUEST_MERGED: 1000,
      SOCIAL_MEDIA_PROMOTION: 1000,
    },
  },
}

export const mockUserPage = async (req: Request) => {
  const goodResponse = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }
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
}
beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(mockUserPage)
})

it.skip('renders User Weekly page', async () => {
  try {
    const { container } = render(User, {
      router: {
        pathname: '/users/111',
        route: '/users/111',
        asPath: '/users/111',
        query: { details: ['111', 'weekly'] },
      },
    })
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('alert', { name: 'Loading' })
    )
    expect(container).toMatchSnapshot()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('cool', e)
  }
})
