export const oidcSettings = {
  authority: process.env.BD_OIDC_IP,
  client_id: process.env.BD_OIDC_CLIENT_ID,
  redirect_uri: process.env.BD_APP_URL + '/oidc-callback',
  post_logout_redirect_uri: process.env.BD_APP_URL,
<<<<<<< Updated upstream
  response_type: 'code id_token token',
=======
  response_type: 'code',
>>>>>>> Stashed changes
  scope: 'openid profile email',
  automaticSilentRenew: true,
  silent_redirect_uri: process.env.BD_APP_URL + '/oidc-callback',
  revokeAccessTokenOnSignout: true
  // popup_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signin.html',
  // popup_post_logout_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signout.html',
  // filterProtocolClaims: true,
  // loadUserInfo: true
}
