/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
