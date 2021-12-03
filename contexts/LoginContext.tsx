import React from 'react'
import useLogin, { STATUS } from 'hooks/useLogin'

/* exemplary example data
const example = {
  metadata: {
    id: 111,
    created_at: '2021-11-30T23:28:59.505Z',
    updated_at: '2021-11-30T23:43:28.555Z',
    email: 'werewolf@ironfish.network',
    graffiti: 'werewolf',
    total_points: 0,
    country_code: 'USA',
    email_notifications: false,
    last_login_at: null,
    discord: 'werew0lf',
    telegram: null,
    confirmation_token: '01FNSJW13ESM3PNKQXWRYM24CH',
    confirmed_at: '2021-11-30T23:43:28.554Z',
    github: null,
  },
  magicMetadata: {
    issuer: 'did:ethr:0x092309283409b092109182920910910928309109',
    publicAddress: '0x6a84e014F0bh2903B020293a0293010101020202',
    email: 'werewolf@ironfish.network',
    isMfaEnabled: false,
    phoneNumber: null,
  },
  }
*/

export const LoginContext = React.createContext<ReturnType<typeof useLogin>>({
  checkLoggedIn: () => false,
  isLoading: () => false,
  isFailed: () => false,
  error: null,
  magicMetadata: null,
  metadata: null,
  status: STATUS.LOADING,
  setStatus: () => false,
})
