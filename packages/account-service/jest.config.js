module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/test/_setupTests.ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    "@entity/(.*)": "<rootDir>/node_modules/@buy1s/account-entity/src/$1",
    "@root/(.*)": "<rootDir>/src/$1"
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],
  verbose: true,
}
