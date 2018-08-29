export default (store) => {
  return (to, from, next) => {
    let redirectAuto
    if (sessionStorage.getItem('hasEverConnected') === 'true') {
      redirectAuto = true
    }

    store.dispatch('oidcCheckAuthAccessRedirect', {route: to, redirectAuto})
      .then((hasAccess) => {
        if (hasAccess) {
          next()
        }
      })
  }
}
