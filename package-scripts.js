const FIXTURES = {
  CYPRESS: {
    LOCAL: 'cypress/cypress-local.json',
    PROD: 'cypress/cypress-PROD.json',
  },
}
const e2e = config => cmd => `cypress ${cmd} --config-file ${config}`
const localE2E = e2e(FIXTURES.CYPRESS.LOCAL)
const prodE2E = e2e(FIXTURES.CYPRESS.PROD)

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
          script: localE2E(`run`),
          debug: localE2E(`open`),
        },
        script: prodE2E(`run`),
      },
    },
  },
}
