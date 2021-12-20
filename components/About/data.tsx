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
  /*
  {
    title: 'Trader',
    content:
      'Earn this NFT by being active with transactions. Sending 3 a day is an easy way to win!',
    pic: '/reward-transactor.png',
    },
   */
]

export const guidelines = {
  columnOne: [
    {
      title: 'Rewards',
      content:
        'The Incentivized Testnet program will distribute up to 420,000 (1% of the initial supply) Iron Fish tokens to eligible participants, proportional to your Leaderboard points. Token distribution may be canceled at any time due to regulatory concerns. We may at any time amend or eliminate Leaderboard points.',
      behind: 'bg-white',
    },
    {
      title: 'Lost Work',
      content:
        "Points will only be awarded once an account has been created. Points for mining blocks are awarded automatically. Blocks that are mined before an account was created will not be counted. Work will be logged hourly. In the event of a technical problem or a chain reorganization, some of your work may be lost and will not reflect in your reward. If you sign up after you've mined blocks, points will not be assigned retroactively for those blocks.",
      behind: 'bg-ifpink',
    },
    {
      title: 'Unforeseeable',
      content:
        'In the event that legal or regulatory issues arise, rewards may be restructured, postponed, or even canceled.',
      behind: 'bg-white',
    },
  ],
  columnTwo: [
    {
      title: 'Leaderboard Points',
      content:
        'Leaderboard points are used solely to track contribution to the Iron Fish Testnet and have no cash or monetary value. Leaderboard points are not transferable and are not redeemable or exchangeable for any cryptocurrency or digital assets. For eligible users under relevant securities laws, Iron Fish Inc will use commercially reasonable efforts to distribute tokens to eligible testnet participants. Token distribution may be canceled at any time due to regulatory concerns. We may at any time amend or eliminate Leaderboard points.',
      behind: 'bg-ifpink',
    },
    {
      title: 'Weekly Cycles',
      content:
        'Weekly cycles run from Monday to Sunday, during which a participant can earn points in the defined categories above. Once a participant has earned his or her maximum amount of points in a given category, a participant can no longer earn points in that category until the next cycle.',
      behind: 'bg-white',
    },
    {
      title: 'Maintenance',
      content:
        'Iron Fish might restart the chain regularly for development purposes. Your score will be saved before a restart happens.',
      behind: 'bg-ifpink',
    },
  ],
}

export const callsToAction = {
  columnOne: [
    {
      title: 'Finding Bugs',
      content:
        'If you found a bug in the Iron Fish full node implementation, please submit it as an issue. Issues are reviewed by the core development team on a rolling basis and awarded by the end of the week. The issue will be accepted if it’s a legitimate bug and not a duplicate of an existing issue. Fill out the form to claim your points after submitting an issue.',
      points: ['1 bug = 100 points'],
      ctaText: 'Submit an issue ',
      href: 'https://github.com/iron-fish/ironfish/issues',
      submissionForm: true,
    },
    {
      title: 'Contributing to the Community',
      content:
        'Help us make Iron Fish more accessible to a wider audience! Published tutorials, articles, forum posts, videos, scripts, and translations are examples of contributions that can earn you points.',
      comingSoon: true,
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
      points: ['1 block = 100 points'],
      ctaText: 'Get started with mining',
      href: 'https://ironfish.network/docs/onboarding/miner-iron-fish',
    },
    {
      title: 'Promoting the Testnet',
      content:
        'Quality tweets, videos, podcasts, vlogs, poems, TikToks, you name it; you might earn points for them.',
      comingSoon: true,
    },
    {
      title: 'Submit a Pull Request',
      content:
        'Submit a PR to the Iron Fish repo. Points are earned if the PR gets accepted and merged. Fill out the form to claim your points after your PR is merged.',
      points: [
        'Small PR = 250 points',
        'Medium PR = 750 points',
        'Large PR = 1000 points',
      ],
      ctaText: 'Submit a PR',
      href: 'https://github.com/iron-fish/ironfish/pulls',
      submissionForm: true,
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
