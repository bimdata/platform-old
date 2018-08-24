export const oidcSettings = {
  authority: 'https://login-staging.bimdata.io/',
  client_id: '952974',
  redirect_uri: 'http://localhost:8080/oidc-callback',
  // post_logout_redirect_uri: 'http://localhost:8080/signup-required',
  response_type: 'code id_token token',
  scope: 'openid profile email'
  // popup_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signin.html',
  // popup_post_logout_redirect_uri: 'http://localhost:5000/identityserver-sample-popup-signout.html',
  // silent_redirect_uri: 'http://localhost:5000/identityserver-sample-silent.html',
  // automaticSilentRenew: true,
  // filterProtocolClaims: true,
  // loadUserInfo: true
}
