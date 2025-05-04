export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx'],
};