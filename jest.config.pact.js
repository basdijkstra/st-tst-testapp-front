module.exports = {
  preset: 'jest-preset-angular',
  testMatch: ['**/+(*.)+(spec).(pact).(ts)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    url: 'http://localhost:4010'
  }
};
