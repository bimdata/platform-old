'use strict'
const merge = require('webpack-merge')
const bimEnv = require('./bim.env')

module.exports = merge(bimEnv, {
  NODE_ENV: '"development"',
  BD_ENV: '"staging"',
  BD_API_BASE_URL: '"https://api-staging.bimdata.io/oauth/v2/"'
})
