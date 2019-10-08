/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import Vue from 'vue'
import Router from 'vue-router'
import LayoutPageDashboard from '@/components/layouts/LayoutPageDashboard'
import PageProject from '@/components/pages/PageProject'
import PageProjectList from '@/components/pages/PageProjectList'
import PageCloudList from '@/components/pages/PageCloudList'
import PageViewer from '@/components/pages/PageViewer'
import OidcCallback from '@/components/pages/PageOIDCCallback'
import store from '@/store'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutPageDashboard,
      meta: {
        isPublic: false
      },
      children: [
        {
          path: '',
          name: 'home',
          component: PageCloudList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)',
          name: 'project-list',
          component: PageProjectList,
          meta: {
            isPublic: false,
            container: 'container p-0'
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)',
          name: 'project',
          component: PageProject,
          meta: {
            isPublic: false
          }
        },
        {
          path: 'cloud/:cloudId(\\d+)/project/:projectId(\\d+)/viewer/:ifcId(\\d+)',
          name: 'viewer',
          component: PageViewer,
          meta: {
            isPublic: false
          }
        }
      ]
    },
    {
      path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
      name: 'oidcCallback',
      component: OidcCallback,
      meta: {
        isOidcCallback: true,
        isPublic: true
      }
    }
  ]
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store))

export default router
