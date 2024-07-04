module.exports = {
  preset: 'jest-preset-angular',
  testMatch: ['**/+(*.)+(spec).(pact).(ts)'],
  testURL: 'http://localhost:4010',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
