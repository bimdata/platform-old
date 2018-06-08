// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Interceptor from './api/interceptor'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    const token = localStorage.getItem('token')

    if (token != null) {
      this.$store.dispatch('authentication/setAuthenticated')
    }

    const interceptor = new Interceptor()
    interceptor.enableInterceptor()
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresLogout = to.matched.some(record => record.meta.requiresLogout)
  let isAuthenticated = store.state.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next({name: 'login'})
  } else if (requiresLogout && isAuthenticated && to.name === 'login') {
    next({name: 'home'})
  } else {
    next()
  }
})
