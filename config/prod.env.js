'use strict'

const merge = require('webpack-merge')
const bimEnv = require('./bim.env')

module.exports = merge(bimEnv, {
  NODE_ENV: '"production"',
  BD_API_BASE_URL: '"https://api-beta.bimdata.io/oauth/v2/"'
})
