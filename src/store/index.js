import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationModule from './modules/authentication'
import ProjectModule from './modules/project'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null,
    lang: 'fr',
    currentUser: {},
    currentCloud: {id: 3, name: '__test__'},
    currentProject: {},
    clouds: [],
    projects: []
  },
  modules: {
    authentication: AuthenticationModule,
    project: ProjectModule
  },
  mutations,
  actions,
  getters
})
