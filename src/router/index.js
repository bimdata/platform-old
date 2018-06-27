import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/pages/PageHome'
import PageLogin from '@/components/pages/PageLogin'
import PageLoginForgotPassword from '@/components/pages/PageLoginForgotPassword'
import PageLoginResetPassword from '@/components/pages/PageLoginResetPassword'
import PageLoginSignUp from '@/components/pages/PageLoginSignUp'
import LayoutPageLogin from '@/components/layouts/LayoutPageLogin'
import LayoutPageDashboard from '@/components/layouts/LayoutPageDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: LayoutPageDashboard,
      meta: {
        requiresAuth: true,
        requiresLogout: false
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: PageHome,
          meta: {
            requiresAuth: true,
            requiresLogout: false
          }
        }
      ]
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
          path: '/signup',
          name: 'signup',
          component: PageLoginSignUp,
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
