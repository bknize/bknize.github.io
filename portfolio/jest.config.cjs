/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.md$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.css$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  setupFiles: ['<rootDir>/src/jestEnvPolyfills.cjs'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
