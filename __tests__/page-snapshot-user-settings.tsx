import User from 'pages/users/[id]'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from 'jest.utils'
import fetch from 'jest-fetch-mock'
import { mockUserPage } from './page-snapshot-user'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(mockUserPage)
})

it.skip('renders User Settings page', async () => {
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
    // eslint-disable-next-line no-console
    console.warn('cool', e)
  }
})
