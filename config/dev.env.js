'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BD_ENV: '"staging"',
  BD_API_BASE_URL: '"https://api-beta.bimdata.io"'
})
