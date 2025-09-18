module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|expo-router|react-clone-referenced-element|react-native-reanimated|moti|nativewind))',
  ],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/*.{test,spec}.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.{ts,tsx}', // optional: skip barrel files
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
    '/scripts/',
  ],
};
