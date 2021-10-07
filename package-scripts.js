module.exports = {
  scripts: {
    dev: 'next dev',
    build: 'next build',
    start: 'next start',
    lint: 'next lint',
    precommit: 'nps care',
    care: 'nps build lint',
    dry: 'twly --boring --lines 3',
    test: {
      integration: {
        dev: {
          script: `cypress run --config-file cypress/cypress-local.json`,
          debug: `cypress open --config-file cypress/cypress-local.json`,
        },
        script: `cypress run --config-file cypress/cypress-prod.json`,
      },
    },
  },
}
