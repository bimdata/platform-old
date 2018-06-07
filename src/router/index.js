import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import PageLogin from '@/components/PageLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/login',
      name: 'login',
      component: PageLogin,
      meta: {
        requiresAuth: false,
        requiresLogout: true
      }
    }
  ]
})
