module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/test/**/*.ts?(x)',
    '<rootDir>/test/**/?(*.)(spec|test).ts?(x)',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
