# website-testnet

The website for the Iron Fish testnet. The rest of the Iron Fish website can be found in [iron-fish/website](https://github.com/iron-fish/website).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create an `.env.local` file. You can copy the existing template (`cp .env.template .env.local`)

```
NEXT_PUBLIC_API_URL=https://ironfish-api-staging.herokuapp.com
API_URL=https://ironfish-api-staging.herokuapp.com
# NEXT_PUBLIC_API_URL=http://localhost:8003
# API_URL=http://localhost:8003
NEXT_PUBLIC_API_KEY=test
NEXT_PUBLIC_MAGIC_SECRET_KEY=test
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

*Optional* Run `npx husky install` in order to set up your git hooks locally.

## Scripts

1. Add [nps](https://www.npmjs.com/package/nps) using either `yarn global add nps` or `npm i nps -g`
2. Run `nps` for a list of scripts to run in the repo.

## Commit Hooks

By default we run a precommit hook which runs `nps care`.
If needed, you can avoid this hook by adding a `--no-verify` flag, e.g. `git commit -m "cool" --no-verify`

## Alternate Port

Run `npm run dev -- -p 4040` or `yarn dev -p 4040` to run the server locally on a different port than 3000 (the default)
