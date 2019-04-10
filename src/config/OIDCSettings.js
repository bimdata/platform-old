export const oidcSettings = {
  authority: process.env.BD_OIDC_IP,
  client_id: process.env.BD_OIDC_CLIENT_ID,
  redirect_uri: process.env.BD_APP_URL + '/oidc-callback',
  post_logout_redirect_uri: process.env.BD_APP_URL,
  response_type: 'code id_token token',
  scope: 'openid profile email'
  // popup_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signin.html',
  // popup_post_logout_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signout.html',
  // silent_redirect_uri: 'http://localhost:5000/identityserver-sample-silent.html',
  // automaticSilentRenew: true,
  // filterProtocolClaims: true,
  // loadUserInfo: true
}
