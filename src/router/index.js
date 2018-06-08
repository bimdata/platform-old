import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import PageLogin from '@/components/PageLogin'
import PageLoginForgotPassword from '@/components/PageLoginForgotPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
      meta: {
        requiresAuth: true,
        requiresLogout: false
      }
    },
    {
      path: 'login',
      name: 'login',
      component: PageLogin,
      meta: {
        requiresAuth: false,
        requiresLogout: true
      },
      children: [
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: PageLoginForgotPassword,
          meta: {
            requiresAuth: false,
            requiresLogout: true
          }
        }
      ]
    }
  ]
})
