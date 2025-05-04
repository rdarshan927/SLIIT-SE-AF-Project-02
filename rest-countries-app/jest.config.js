export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(jsx)$': 'babel-jest', // Note: Added .js here
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  extensionsToTreatAsEsm: ['.jsx'], // Note: Added .js here
  testMatch: ['**/__tests__/**/*.jsx', '**/?(*.)+(spec|test).jsx'], // Be explicit about test patterns
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$)'
  ],
  moduleDirectories: ['node_modules', 'src'], // Add src directory for module resolution
  // Ensure relative paths work properly with ESM
  resolver: undefined
};