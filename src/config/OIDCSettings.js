/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
export const oidcSettings = {
  authority: process.env.BD_OIDC_IP + '/auth/realms/bimdata',
  client_id: process.env.BD_OIDC_CLIENT_ID,
  redirect_uri: process.env.BD_APP_URL + '/oidc-callback',
  post_logout_redirect_uri: process.env.BD_APP_URL,
  response_type: 'code',
  scope: 'openid profile email',
  revokeAccessTokenOnSignout: true,
  automaticSilentRenew: true,
  validateSubOnSilentRenew: true,
  extraQueryParams: {kc_idp_hint: 'bimdataconnect'},
  monitorSession: false,
  clockSkew: 900,
  logoutUrl: process.env.BD_OIDC_IP + '/auth/realms/bimdata/protocol/openid-connect/logout'
}
