import Vue from 'vue'
import Vuex from 'vuex'
import ProjectModule from './modules/project'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

Vue.use(Vuex)

let vuexOidcStorage = vuexOidcCreateStoreModule(oidcSettings)
let originalMethod = vuexOidcStorage.actions.authenticateOidc
vuexOidcStorage.actions.authenticateOidc = function authenticateOidc (context, redirectPath) {
  Object.keys(localStorage)
    .filter(entry => entry.startsWith('oidc.'))
    .forEach(entry => localStorage.removeItem(entry))
  originalMethod(context, redirectPath)
}

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
    oidc: vuexOidcStorage,
    project: ProjectModule
  },
  mutations,
  actions,
  getters
})

export default store
