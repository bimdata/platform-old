/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
import Vue from 'vue'
import Vuex from 'vuex'
import ProjectModule from './modules/project'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    loaderPage: false,
    lang: 'fr',
    currentUser: {},
    currentCloud: {
      projects: [],
      guests: []
    },
    clouds: []
  },
  modules: {
    oidc: vuexOidcCreateStoreModule(oidcSettings),
    project: ProjectModule
  },
  mutations,
  actions,
  getters
})

export default store
