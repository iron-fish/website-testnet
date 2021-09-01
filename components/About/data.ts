export const cards = [
  {
    title: 'Big Winner',
    content:
      'Earn this NFT by becoming the person with the most total points over the span of the testnet!',
    pic: '/reward-champion.png',
  },
  {
    title: 'Miner',
    content:
      'Earn this NFT by mining the most blocks over the entire span of our testnet.',
    pic: '/reward-miner.png',
  },
  {
    title: 'Bug Catcher',
    content:
      'Earn this NFT by reporting the most bugs over the lifetime of our testnet.',
    pic: '/reward-bug-catcher.png',
  },
  {
    title: 'Net Promoter',
    content:
      'Earn this NFT by promoting our testnet on social media - Twitter, especially!',
    pic: '/reward-promoter.png',
  },
  {
    title: 'Explorer',
    content:
      'Earn this NFT by being active on all fronts in the testnet. Your participation would be noted!',
    pic: '/reward-explorer.png',
  },
  {
    title: 'Community Contributor',
    content: 'Earn this NFT by making our testnet more accessible.',
    pic: '/reward-contributor.png',
  },
  {
    title: 'Builder',
    content:
      'Earn this NFT by merging the most valuable PR’s. We are looking for quality over quantity.',
    pic: '/reward-pull-requester.png',
  },
  {
    title: 'Trader',
    content:
      'Earn this NFT by being active with transactions. Sending 3 a day is an easy way to win!',
    pic: '/reward-transactor.png',
  },
]

export const guidelines = {
  columnOne: [
    {
      title: 'Mining',
      content:
        'Miners must enter their private key to be eligible for reward. AML/KYC check may be required depending on reward amount.',
      behind: 'white',
    },
    {
      title: 'Maintenance',
      content:
        'Iron Fish might restart the chain regularly for development purposes. Your score will be saved before a restart happens.',
      behind: 'ifpink',
    },
    {
      title: 'Unforeseeable',
      content:
        'In the unlikely event that legal or regulatory issues arise, rewards may be restructured, postponed, or even cancelled.',
      behind: 'white',
    },
  ],
  columnTwo: [
    {
      title: 'Rewards',
      content:
        'Rewards will be encoded into the genesis block and vest linearly over 6 months after mainnet launch.',
      behind: 'ifpink',
    },
    {
      title: 'Blocks',
      content:
        'Scores will be calculated in $ORE. Blocks that are mined but not added to the chain won’t be counted.',
      behind: 'white',
    },
    {
      title: 'Lost Work',
      content: `Work will be logged hourly. In the event of a technical problem or reorg some of your work may be lost and will not reflect in your reward. If you sign up after you've mined, points will not be assigned retroactively.`,
      behind: 'ifpink',
    },
    {
      title: 'Weekly Cycles',
      content:
        'The Monday to Sunday cycles in which a participant can earn points in the defined categories above. Once a participant has earned his or her maximum amount of points in a given category, that category can no longer earn that participant points until the following week when the cycle has reset.',
      behind: 'white',
    },
  ],
}

export const callsToAction = {
  columnOne: [
    {
      title: 'Finding Bugs',
      content:
        'Do so by providing a detailed account of your bug on our Discord channel.',
      points: ['1 bug = 100 points', 'Report up to 10 bugs a week'],
      ctaText: 'Document Bugs',
      href: 'https://github.com/iron-fish/ironfish/issues',
    },
    {
      title: 'Contributing to the Community',
      content:
        'Contributing to the community means helping us make our testnet more accessible to a wider audience. For example, translating our Getting Started doc to another language is a great way to make Iron Fish more accessible.',
      points: [
        'Points commensurate with quality of contribution.',
        'Email us before submitting your contribution so we can help you',
      ],
      ctaText: 'Contribute Today',
      href: 'https://github.com/iron-fish/website/tree/master/docs/onboarding',
    },
    {
      title: 'Being an Explorer',
      content:
        'The Explorer category is a way for our team to award participants who have made significant contributions to the testnet that don’t fall within a defined category. These are subjective considerations made by the Iron Fish team.',
      earn: 0,
    },
  ],
  columnTwo: [
    {
      title: `Mining the testnet`,
      content:
        'Actively mining our testnet earns you points for blocks that you mine.',
      points: ['1 block = 10 points', 'Mine 100 blocks a week'],
      ctaText: 'Install Iron Fish',
      href: 'https://ironfish.network/docs/onboarding/miner-iron-fish',
    },
    {
      title: 'Promoting the Testnet',
      content:
        'Tweets, blogs, poems, you name it; you’ll earn points from them.',
      points: ['1 Promotion = 10 points', 'Make 100 promotions a week'],
      ctaText: 'Talk about us',
      href: 'https://twitter.com/ironfishcrypto',
    },
    {
      title: 'Submit a Pull Request',
      content: 'Submit a PR to be reviewed by one of our teammates.',
      points: ['Points commensurate with quality of PR'],
      ctaText: 'Write some code',
      href: 'https://github.com/iron-fish/ironfish/pulls',
    },

    {
      title: 'More Categories',
      content:
        'As our incentivized testnet grows we will inevitably add categories to it. If you have any great suggestions on what we could add, please reach out on Discord.',
      earn: 0,
      kind: 'coming soon',
    },
  ],
}

export const readingLinks = [
  { text: 'Testnet Leaderboard', href: '/leaderboard' },
  { text: 'Testnet Community', href: '#' },
  { text: 'Testnet FAQ', href: '#' },
  { text: 'Get Started', href: '#' },
]
