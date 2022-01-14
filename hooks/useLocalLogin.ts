import { LoginContext, STATUS } from './useLogin'

export const useLocalLogin = (): LoginContext => ({
  checkLoggedIn: () => true,
  checkLoading: () => false,
  checkFailed: () => false,
  setError: () => {},
  error: null,
  status: STATUS.LOADED,
  setStatus: () => {},
  metadata: {
    id: 3,
    created_at: '2021-10-30T23:28:59.505Z',
    updated_at: '2021-10-30T23:43:28.555Z',
    email: 'cooldev@ironfish.network',
    graffiti: 'rohanjadvani',
    total_points: 1100,
    country_code: 'USA',
    email_notifications: false,
    last_login_at: '2021-10-30T23:29:49.101Z',
    discord: 'coolcooldev',
    telegram: '',
  },
  magicMetadata: {
    issuer: 'did:ethr:0xFfcD8602De681449Fa70C304096a84e014Fa123C',
    publicAddress: '0xFfcD8602De681449Fa70C304096a84e014Fa123C',
    email: 'cooldev@ironfish.network',
    phoneNumber: null,
  },
})

export default useLocalLogin
