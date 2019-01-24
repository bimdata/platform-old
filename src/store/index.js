import Vue from 'vue'
import Vuex from 'vuex'
import ProjectModule from './modules/project'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

Vue.use(Vuex)
let oidc = vuexOidcCreateStoreModule(oidcSettings)

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    lang: 'fr',
    currentUser: {},
    currentCloud: {id: 2, name: 'GABZZ'},
    clouds: []
  },
  modules: {
    oidc,
    project: ProjectModule
  },
  mutations,
  actions,
  getters
})

export default store
