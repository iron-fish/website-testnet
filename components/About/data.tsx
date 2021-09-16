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
    content:
      'Earn this NFT by making our testnet more accessible to our entire community.',
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
      behind: 'bg-white',
    },
    {
      title: 'Maintenance',
      content:
        'Iron Fish might restart the chain regularly for development purposes. Your score will be saved before a restart happens.',
      behind: 'bg-ifpink',
    },
    {
      title: 'Unforeseeable',
      content:
        'In the unlikely event that legal or regulatory issues arise, rewards may be restructured, postponed, or even cancelled.',
      behind: 'bg-white',
    },
  ],
  columnTwo: [
    {
      title: 'Rewards',
      content:
        'Rewards will be encoded into the genesis block and vest linearly over 6 months after mainnet launch.',
      behind: 'bg-ifpink',
    },
    {
      title: 'Blocks',
      content:
        'Scores will be calculated in $ORE. Blocks that are mined but not added to the chain won’t be counted.',
      behind: 'bg-white',
    },
    {
      title: 'Lost Work',
      content: `Work will be logged hourly. In the event of a technical problem or reorg some of your work may be lost and will not reflect in your reward. If you sign up after you've mined, points will not be assigned retroactively.`,
      behind: 'bg-ifpink',
    },
    {
      title: 'Weekly Cycles',
      content:
        'The Monday to Sunday cycles in which a participant can earn points in the defined categories above. Once a participant has earned his or her maximum amount of points in a given category, that category can no longer earn that participant points until the following week when the cycle has reset.',
      behind: 'bg-white',
    },
  ],
}

export const callsToAction = {
  columnOne: [
    {
      title: 'Finding Bugs',
      content:
        'If you found a bug in the Iron Fish full node implementation, please submit it as an issue. Issues are reviewed by the core development team on a rolling basis and awarded by the end of the week. The issue will be accepted if it’s a legitimate bug and not a duplicate of an existing issue.',
      points: ['1 bug = 100 points'],
      ctaText: 'Submit an issue ',
      href: 'https://github.com/iron-fish/ironfish/issues',
    },
    {
      title: 'Contributing to the Community',
      content:
        'Help us make Iron Fish more accessible to a wider audience! Published tutorials, articles, forum posts, videos, scripts, and translations are examples of contributions that can earn you points. Email us at testnet@ironfish.network with a link and your Iron Fish graffiti to submit your contribution.',
      points: [
        'Small contribution = 10 points',
        'Medium contribution = 100 points ',
        'Large contribution = 1000 points ',
      ],
      ctaText: 'Email us',
      href: 'mailto:testnet@ironfish.network',
    },
    {
      title: 'Being an Explorer',
      content:
        'Sometimes the community does something amazing that doesn’t fall under any of these categories. Email us at testnet@ironfish.network with your Iron Fish graffiti and let us know about it!',
      earn: 0,
      ctaText: 'Email us',
      href: 'mailto:testnet@ironfish.network',
    },
  ],
  columnTwo: [
    {
      title: `Mining the testnet`,
      content:
        'Once you sign up for the incentivized testnet, actively mining automatically earns you points for blocks that are mined and accepted to the main chain.',
      points: ['1 block = 10 points'],
      ctaText: 'Get started with mining',
      href: 'https://ironfish.network/docs/onboarding/miner-iron-fish',
    },
    {
      title: 'Promoting the Testnet',
      content:
        'Quality tweets, videos, podcasts, vlogs, poems, TikToks, you name it; you might earn points for them.  Email us at testnet@ironfish.network with a link and your Iron Fish graffiti to submit your contribution.',
      points: [
        'Small promotion = 10 points',
        'Medium promotion = 100 points ',
        'Large promotion = 1000 points ',
      ],
      ctaText: 'Email us',
      href: 'mailto:testnet@ironfish.network',
    },
    {
      title: 'Submit a Pull Request',
      content:
        'Submit a PR to the Iron Fish repo. Points are earned if the PR gets accepted and merged.',
      points: [
        'Small PR = 250 points',
        'Medium PR = 750 points',
        'Large PR = 1000 points',
      ],
      ctaText: 'Submit a PR',
      href: 'https://github.com/iron-fish/ironfish/pulls',
    },

    {
      title: 'More Categories',
      content:
        'Let us know if you have suggestions for other categories we should add!',
      ctaText: 'Reach out on Discord',
      href: 'https://discord.com/invite/EkQkEcm8DH',
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
