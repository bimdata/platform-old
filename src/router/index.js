import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import PageLogin from '@/components/PageLogin'
import PageLoginForgotPassword from '@/components/PageLoginForgotPassword'
import PageLoginResetPassword from '@/components/PageLoginResetPassword'
import LayoutPageLogin from '@/components/LayoutPageLogin'
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
      path: '/login',
      component: LayoutPageLogin,
      meta: {
        requiresAuth: false,
        requiresLogout: true
      },
      children: [
        {
          path: '/',
          name: 'login',
          component: PageLogin,
          meta: {
            requiresAuth: false,
            requiresLogout: true
          }
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: PageLoginForgotPassword,
          meta: {
            requiresAuth: false,
            requiresLogout: true
          }
        },
        {
          path: '/reset-password',
          query: {reset_token: ''},
          name: 'reset-password',
          component: PageLoginResetPassword,
          meta: {
            requiresAuth: false,
            requiresLogout: true
          }
        }
      ]
    }
  ]
})
