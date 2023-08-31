/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverageFrom: ['./src/**/*.ts', './src/**/*.tsx'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
