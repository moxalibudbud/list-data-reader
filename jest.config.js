// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@utils$": "<rootDir>/src/utils",
    "^@file-readers/(.*)$": "<rootDir>/src/file-readers/$1",
    "^@file-readers$": "<rootDir>/src/file-readers"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
