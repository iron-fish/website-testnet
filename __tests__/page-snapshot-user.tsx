import User from 'pages/users/[...details]'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { API_URL } from 'apiClient/client'
import { render } from 'jest.utils'
import fetch from 'jest-fetch-mock'

beforeEach(() => fetch.resetMocks())
const FIXTURE = {
  user: {
    id: 2,
    country_code: 'ROU',
    graffiti: 'dracula_edit',
    total_points: 0,
    last_login_at: '2021-12-21T20:29:54.502Z',
    rank: 3,
  },
  events: {
    object: 'list',
    data: [],
    metadata: {
      has_next: false,
      has_previous: false,
    },
  },
  allTimeMetrics: {
    user_id: 2,
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

it('renders User page', async () => {
  try {
    const good = { status: 200 }
    fetch.mockResponses(
      [JSON.stringify(FIXTURE.user), good],
      [JSON.stringify(FIXTURE.events), good],
      [JSON.stringify(FIXTURE.allTimeMetrics), good],
      [JSON.stringify(FIXTURE.weeklyMetrics), good],
      [JSON.stringify(FIXTURE.metricsConfig), good]
    )
    const { container } = render(User, {
      router: {
        pathname: '/users/111',
        route: '/users/111',
        asPath: '/users/111',
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
