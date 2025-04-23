module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS modules
    '^@/(.*)$': '<rootDir>/src/$1', // Supports @ alias
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // JSX support
  },
};
