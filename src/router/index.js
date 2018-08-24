import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/pages/PageHome'
import PageLogin from '@/components/pages/PageLogin'
import PageLoginForgotPassword from '@/components/pages/PageLoginForgotPassword'
import PageLoginResetPassword from '@/components/pages/PageLoginResetPassword'
import PageLoginSignUp from '@/components/pages/PageLoginSignUp'
import LayoutPageLogin from '@/components/layouts/LayoutPageLogin'
import LayoutPageDashboard from '@/components/layouts/LayoutPageDashboard'
import PageProject from '@/components/pages/PageProject'
import PageComponents from '@/components/pages/PageComponents'
import PageViewer from '@/components/pages/PageViewer'
import OidcCallback from '@/components/pages/PageOIDCCallback'
import PageSignInRequired from '@/components/pages/PageSignInRequired'
import oidcRouterMiddleware from './oidcRouterMiddleware'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutPageDashboard,
      meta: {
        isPublic: false
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: PageHome,
          meta: {
            isPublic: false
          }
        },
        {
          path: 'project/:id(\\d+)',
          name: 'project',
          component: PageProject,
          meta: {
            isPublic: false
          }
        },
        {
          path: 'viewer/cloud/:cloudId(\\d+)/project/:projectId(\\d+)/ifc/:ifcId(\\d+)',
          name: 'viewer',
          component: PageViewer,
          meta: {
            isPublic: false
          }
        }
      ]
    },
    {
      path: '/login',
      component: LayoutPageLogin,
      meta: {
        isPublic: true
      },
      children: [
        {
          path: '/',
          name: 'login',
          component: PageLogin,
          meta: {
            isPublic: true
          }
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: PageLoginForgotPassword,
          meta: {
            isPublic: true
          }
        },
        {
          path: '/signup',
          name: 'signup',
          component: PageLoginSignUp,
          meta: {
            isPublic: true
          }
        },
        {
          path: '/reset-password',
          query: {reset_token: ''},
          name: 'reset-password',
          component: PageLoginResetPassword,
          meta: {
            isPublic: true
          }
        }
      ]
    },
    {
      path: '/components',
      name: 'components',
      component: PageComponents,
      meta: {
        isPublic: false
      }
    },
    {
      path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback,
      meta: {
        isVuexOidcCallback: true,
        isPublic: true
      }
    },
    {
      path: '/signin-required', // Needs to match redirect_uri in you oidcSettings
      name: 'signin-required',
      component: PageSignInRequired,
      meta: {
        isVuexOidcCallback: false,
        isPublic: true
      }
    }
  ]
})

// router.beforeEach(vuexOidcCreateRouterMiddleware(store))
router.beforeEach(oidcRouterMiddleware(store))

export default router
