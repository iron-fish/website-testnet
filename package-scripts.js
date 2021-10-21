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
    lint: {
      script: 'next lint',
      repetition: 'twly --boring --lines 3',
    },
    precommit: 'nps care',
    care: 'nps build lint',
    meta: {
      log: `gitparty`,
      dependencies: {
        script: `depcruise -c .dependency-cruiser.js -T dot components pages apiClient contexts data definitions hooks public styles utils --progress -x node_modules definitions | dot -T svg > dependency-graph.svg`,
        interactive: `cat dependency-graph.svg | depcruise-wrap-stream-in-html > dependency-graph.html`,
      },
    },
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
