// eslint-disable-next-line @typescript-eslint/no-var-requires
const { concurrent } = require('nps-utils')
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
      clean: 'next lint',
      script: 'nps lint.clean lint.dry',
      dry: 'twly --boring --lines 3 -t .trc',
    },
    precommit: 'nps care',
    care: concurrent.nps('build', 'lint', 'test'),
    dx: concurrent.nps('build', 'lint', 'meta.dependencies'),
    meta: {
      dependencies: {
        build: `depcruise -c .dependency-cruiser.js -T dot components pages apiClient data definitions hooks public styles utils --progress -x node_modules definitions | dot -T svg > dependency-graph.svg`,
        interactive: `cat dependency-graph.svg | depcruise-wrap-stream-in-html > dependency-graph.html`,
        script: 'nps meta.dep.build meta.dep.interactive',
      },
    },
    test: {
      snapshot: 'nps "test -u"',
      script: 'jest',
      watch: 'nps "test --watch"',
      ci: 'nps "test --ci"',
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
