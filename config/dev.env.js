'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: process.env.NODE_ENV || '"development"',
  BD_OIDC_IP: process.env.BD_OIDC_IP || '"https://login-staging.bimdata.io"',
  BD_OIDC_CLIENT_ID: process.env.BD_OIDC_CLIENT_ID || '"952974"',
  BD_APP_URL: process.env.HOST || '"http://localhost:8080"',
  BD_API_BASE_URL: process.env.BD_API_BASE_URL || '"https://api-staging.bimdata.io"',
  BD_PLATFORM_BACK_BASE_URL: process.env.BD_PLATFORM_BACK_BASE_URL || '"https://platform-back-staging.bimdata.io"'
})
