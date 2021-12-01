// eslint-disable-next-line no-restricted-imports
import { linksMatch, fontsInUse } from '../../utils'

describe('/about', () => {
  beforeEach(() => cy.visit('/about'))
  it('has correct fonts', () => {
    fontsInUse(['favorit-regular', 'sans-serif', 'extended-regular'])
  })
  it('has links', () => {
    linksMatch([
      {
        isImage: false,
        text: 'Get Started',
        href: 'https://ironfish.network/docs/onboarding/iron-fish-tutorial',
      },
      {
        isImage: false,
        text: 'Whitepaper',
        href: 'https://ironfish.network/docs/whitepaper/1_introduction',
      },
      { isImage: false, text: 'Login to Testnet', href: '/login' },
      { isImage: false, text: '', href: 'http://ironfish.network/' },
      {
        isImage: false,
        text: 'Get Started',
        href: 'https://ironfish.network/docs/onboarding/iron-fish-tutorial',
      },
      {
        isImage: false,
        text: 'Whitepaper',
        href: 'https://ironfish.network/docs/whitepaper/1_introduction',
      },
      { isImage: false, text: 'Login to Testnet', href: '/login' },
      {
        isImage: false,
        text: 'Submit an issue ',
        href: 'https://github.com/iron-fish/ironfish/issues',
      },
      {
        isImage: false,
        text: 'Email us',
        href: 'mailto:testnet@ironfish.network',
      },
      {
        isImage: false,
        text: 'View Testnet Guidelines',
        href: '/about#guidelines',
      },
      {
        isImage: false,
        text: 'Get started with mining',
        href: 'https://ironfish.network/docs/onboarding/miner-iron-fish',
      },
      {
        isImage: false,
        text: 'Submit a PR',
        href: 'https://github.com/iron-fish/ironfish/pulls',
      },
      {
        isImage: false,
        text: 'Reach out on Discord',
        href: 'https://discord.com/invite/EkQkEcm8DH',
      },
      {
        isImage: false,
        text: 'View Testnet Guidelines',
        href: '/about#guidelines',
      },
      {
        isImage: false,
        text: 'Show me the leaderboard',
        href: '/leaderboard',
      },
      { isImage: false, text: 'Testnet Leaderboard', href: '/leaderboard' },
      { isImage: false, text: 'Testnet Community', href: '/community' },
      { isImage: false, text: 'Testnet FAQ', href: '/faq' },
      {
        isImage: false,
        text: 'Get Started',
        href: 'https://ironfish.network/docs/onboarding/iron-fish-tutorial',
      },
      { isImage: false, text: '', href: 'https://www.ironfish.network' },
      { isImage: false, text: 'About Us', href: '/about' },
      { isImage: false, text: 'Careers', href: '/careers' },
      { isImage: false, text: 'Blog', href: '/blog' },
      {
        isImage: false,
        text: 'Block Explorer',
        href: 'https://explorer.ironfish.network/',
      },
      {
        isImage: false,
        text: 'Whitepaper',
        href: '/docs/whitepaper/1_introduction',
      },
      { isImage: false, text: 'FAQ', href: '/faq' },
      {
        isImage: false,
        text: 'Drop us a line!',
        href: 'mailto:contact@ironfish.network',
      },
      {
        isImage: true,
        text: 'Telegram',
        href: 'https://t.me/ironfishcryptochat',
      },
      { isImage: true, text: 'Github', href: 'https://github.com/iron-fish' },
      { isImage: true, text: 'Reddit', href: 'http://reddit.com/r/ironfish' },
      {
        isImage: true,
        text: 'Twitter',
        href: 'https://twitter.com/ironfishcrypto',
      },
      {
        isImage: true,
        text: 'Discord',
        href: 'https://discord.gg/EkQkEcm8DH',
      },
    ])
  })
})

export {}
