module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],

  testMatch: [
    '<rootDir>/test/**/*.ts?(x)',
    '<rootDir>/test/**/?(*.)(spec|test).ts?(x)',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
