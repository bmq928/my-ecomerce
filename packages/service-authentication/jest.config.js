module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/test/_setupTests.ts'],
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

// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
//   testEnvironment: 'node',
//   // testMatch: [
//   //   'test/**/*.ts?(x)'
//   // ],
//   modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
//   globals: {
//     NODE_ENV: 'test',
//     'ts-jest': {
//       tsConfig: 'tsconfig.json',
//       diagnostics: true,
//     },
//   },
//   verbose: true,
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
//   transform: {
//     '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
//   },
//   transformIgnorePatterns: ['/node_modules/(?!(lodash-es|react)/)'], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
//   moduleNameMapper: {
//     'aurelia-(.*)': '<rootDir>/node_modules/$1',
//   },
//   // some coverage and results processing options
//   // collectCoverage: true,
//   // collectCoverageFrom: [
//   //   'test/**/*.ts?(x)'
//   // ],
//   coverageDirectory: './coverage',
//   coverageReporters: ['json', 'lcov', 'text'],
// }
