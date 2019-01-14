const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': 'C:/dev/platform/src/$1'
  },
  transform: {
    '^.+\\.js$': 'C:/dev/platform/node_modules/babel-jest',
    '.*\\.(vue)$': 'C:/dev/platform/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  // testRegex: '(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.jsx?$',
  snapshotSerializers: ['C:/dev/platform/node_modules/jest-serializer-vue'],
  setupFiles: ['C:/dev/platform/test/unit/setup'],
  coverageDirectory: 'C:/dev/platform/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
