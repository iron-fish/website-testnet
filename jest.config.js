// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  automock: false,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // https://github.com/testing-library/react-hooks-testing-library/issues/294
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.'],
  moduleNameMapper: {
    '^__tests__/(.*)$': '<rootDir>/__tests__/$1',
    '^apiClient/(.*)$': '<rootDir>/apiClient/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^data/(.*)$': '<rootDir>/data/$1',
    '^definitions/(.*)$': '<rootDir>/definitions/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
