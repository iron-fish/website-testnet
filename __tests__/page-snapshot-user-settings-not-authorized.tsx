import User from 'pages/users/[...details]'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { useNoUser } from 'hooks/useLocalLogin'
import { renderWithRouter } from 'jest.utils'
import fetch from 'jest-fetch-mock'
import { mockUserPage } from './page-snapshot-user'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(mockUserPage)
})

it.skip('renders User Settings page with no loginContext', async () => {
  try {
    const WrappedUser = () => {
      const loginContext = useNoUser()
      return <User loginContext={loginContext} />
    }
    const { container } = renderWithRouter(<WrappedUser />, {
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
